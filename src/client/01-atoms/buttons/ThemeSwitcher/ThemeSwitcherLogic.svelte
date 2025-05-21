<script lang="ts">
  import {theme} from "@models";
  import {onMount} from "svelte";

  const themes = ["light", "dark", "system"];
  let current_theme_index = themes.indexOf(theme.get());

  const theme_switch = () => {
    current_theme_index = (current_theme_index + 1) % themes.length;
    const new_theme = themes[current_theme_index];
    theme.set(new_theme);
    document.documentElement.className = `${new_theme}-theme`;
  };

  onMount(() => {
    const theme_toggle = document.querySelector(".theme-toggle");
    theme_toggle?.addEventListener("click", theme_switch);
  });
</script>
