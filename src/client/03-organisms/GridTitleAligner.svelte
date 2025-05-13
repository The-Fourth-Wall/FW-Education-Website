<script>
  import {onMount} from "svelte";

  export let grid_selector = ".grid";
  export let card_selector = ".card";
  export let title_selector = "[data-title]";

  const align_titles = () => {
    const grids = document.querySelectorAll(grid_selector);

    grids.forEach(grid => {
      const cards = grid.querySelectorAll(card_selector);
      const columns =
        getComputedStyle(grid).gridTemplateColumns.split(" ").length;

      for (let i = 0; i < cards.length; i += columns) {
        const row = Array.from(cards).slice(i, i + columns);
        const titles = row
          .map(card => card.querySelector(title_selector))
          .filter(Boolean);

        if (!titles.length) {
          continue;
        }

        const max_height = Math.max(
          ...titles.map(t => t.getBoundingClientRect().height),
        );
        titles.forEach(t => (t.style.minHeight = `${max_height}px`));
      }
    });
  };

  onMount(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resize_observer = new ResizeObserver(align_titles);
    const cards = document.querySelectorAll(card_selector);
    cards.forEach(card => resize_observer.observe(card));

    window.addEventListener("resize", align_titles);

    align_titles();

    return () => {
      resize_observer.disconnect();
      window.removeEventListener("resize", align_titles);
    };
  });
</script>
