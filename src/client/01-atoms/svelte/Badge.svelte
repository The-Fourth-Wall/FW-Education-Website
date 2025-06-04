<script lang="ts">
  import "../styles/Badge.css";

  import type {Difficulty} from "@models";

  const {text, variant, size} = $props<{
    text: string;
    variant: Difficulty;
    size: number;
  }>();
</script>

<span
  class={`badge ${variant === "master" && "master"}`}
  style={`
    --badge-font-size: ${size}rem;
    --badge-padding: ${size * 0.226}rem ${size * 0.857}rem;
    --badge-background-color: var(--${variant}-background);`}>
  {text}
</span>
