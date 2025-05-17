<script>
  import {onMount} from "svelte";

  export let grid_selector = ".grid";
  export let card_selector = ".card";
  export let title_selector = "[data-title]";

  const is_browser = typeof window !== "undefined";

  let titles = new Map();
  let raf = null;
  let observer = null;
  let media_queries = [];

  function get_column_count(grid) {
    getComputedStyle(grid).gridTemplateColumns.split(" ").length;
  }

  function reset_heights() {
    titles.forEach(title => (title.style.minHeight = ""));
  }

  function align_row(row_cards) {
    const heights = row_cards.map(
      card => titles.get(card)?.getBoundingClientRect().height || 0,
    );
    const max_height = Math.max(...heights);
    row_cards.forEach(card => {
      const title = titles.get(card);
      if (title) {
        title.style.minHeight = `${max_height}px`;
      }
    });
  }

  const align_cards = () => {
    if (!is_browser) {
      return;
    }
    if (raf) {
      cancelAnimationFrame(raf);
    }

    raf = requestAnimationFrame(() => {
      const grids = document.querySelectorAll(grid_selector);
      if (!grids.length) {
        return;
      }

      reset_heights();

      grids.forEach(grid => {
        const cards = Array.from(grid.querySelectorAll(card_selector));
        if (!cards.length) {
          return;
        }

        const columns = get_column_count(grid);
        for (let i = 0; i < cards.length; i += columns) {
          align_row(cards.slice(i, i + columns));
        }
      });
    });
  };

  function create_debounced_align() {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(align_cards, 10);
    };
  }

  onMount(() => {
    if (!is_browser) {
      return;
    }

    const grids = document.querySelectorAll(grid_selector);
    if (!grids.length) {
      return;
    }

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll(card_selector));
      cards.forEach(card => {
        const title = card.querySelector(title_selector);
        if (title) {
          titles.set(card, title);
        }
      });
    });

    const debounced_align = create_debounced_align();

    media_queries = [
      window.matchMedia("(max-width: 832px)"),
      window.matchMedia("(max-width: 1280px)"),
    ];

    media_queries.forEach(query => {
      query.addEventListener("change", align_cards);
    });

    window.addEventListener("resize", debounced_align);

    const all_cards = Array.from(document.querySelectorAll(card_selector));
    observer = new ResizeObserver(debounced_align);
    all_cards.forEach(card => observer.observe(card));

    setTimeout(align_cards, 10);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      if (observer) {
        observer.disconnect();
      }
      media_queries.forEach(query => {
        query.removeEventListener("change", align_cards);
      });
      window.removeEventListener("resize", debounced_align);
      titles.clear();
    };
  });
</script>
