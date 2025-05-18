<script lang="ts">
  import {onMount} from "svelte";

  onMount(() => {
    const button = document.getElementById("02-molecules/BackButton.astro");

    button?.addEventListener("click", () => {
      history.back();
    });

    button?.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        history.back();
      }
    });
  });
</script>
