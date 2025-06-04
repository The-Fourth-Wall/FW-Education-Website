<script lang="ts">
  import type {SvelteComponent} from "svelte";

  let {href, accessibility, children} = $props<{
    href: string;
    accessibility: string;
    children: () => SvelteComponent;
  }>();
</script>

<a
  {href}
  draggable="false"
  aria-label={accessibility}
  onclick={e => {
    if (history.state?.url.includes("/course") && href === "/") {
      e.preventDefault();
      e.stopPropagation();
      history.back();
    }
  }}>
  {@render children()}
</a>
