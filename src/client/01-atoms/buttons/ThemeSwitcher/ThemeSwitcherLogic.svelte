<script lang="ts">
  import {user, type Theme} from "@models";
  import {onMount} from "svelte";

  const themes = ["light", "dark", "system"] as Theme[];
  let current_theme_index = themes.indexOf(user.get()?.theme);

  const theme_switch = () => {
    current_theme_index = (current_theme_index + 1) % themes.length;
    const new_theme = themes[current_theme_index];
    user.set({...user.get(), theme: new_theme});
    document.documentElement.className = `${new_theme}-theme`;
  };

  onMount(() => {
    const theme_toggle = document.querySelector(".theme-toggle");
    theme_toggle?.addEventListener("click", theme_switch);
  });
</script>
