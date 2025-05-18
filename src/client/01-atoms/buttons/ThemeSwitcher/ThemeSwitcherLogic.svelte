<script lang="ts">
  import {onMount} from "svelte";

  const themes = ["light", "dark", "system"];
  let current_theme_index = 2;

  const handle_theme_click = (event: Event) => {
    const button = (event.target as HTMLElement).closest(".theme-toggle");
    current_theme_index = (current_theme_index + 1) % themes.length;
    button?.setAttribute("data-theme", themes[current_theme_index]);
  };

  onMount(() => {
    const button = document.querySelector(".theme-toggle");
    button?.addEventListener("click", handle_theme_click);
  });
</script>
