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

  const get_column_count = grid =>
    getComputedStyle(grid).gridTemplateColumns.split(" ").length;

  const reset_heights = () =>
    titles.forEach(title => (title.style.minHeight = ""));

  const align_row = row_cards => {
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
  };

  const align_cards = () => {
    if (!is_browser) {
      return;
    }
    if (raf) {
      cancelAnimationFrame(raf);
    }

    raf = requestAnimationFrame(() => {
      const grid = document.querySelector(grid_selector);
      if (!grid) {
        return;
      }

      const cards = Array.from(grid.querySelectorAll(card_selector));
      if (!cards.length) {
        return;
      }

      reset_heights();
      const columns = get_column_count(grid);

      for (let i = 0; i < cards.length; i += columns) {
        align_row(cards.slice(i, i + columns));
      }
    });
  };

  const create_debounced_align = () => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(align_cards, 100);
    };
  };

  onMount(() => {
    if (!is_browser) {
      return;
    }

    const grid = document.querySelector(grid_selector);
    if (!grid) {
      return;
    }

    const cards = Array.from(grid.querySelectorAll(card_selector));
    cards.forEach(card => {
      const title = card.querySelector(title_selector);
      if (title) {
        titles.set(card, title);
      }
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
    observer = new ResizeObserver(debounced_align);
    cards.forEach(card => observer.observe(card));

    setTimeout(align_cards, 100);

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
