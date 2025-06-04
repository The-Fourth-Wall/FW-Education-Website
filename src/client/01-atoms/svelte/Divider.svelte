<script lang="ts">
  import "../styles/Divider.css";

  let {faded = false, size} = $props<{
    faded?: boolean;
    size: number;
  }>();
</script>

<div
  class={`divider ${faded ? "faded" : "non-faded"}`}
  style={`--divider-size: ${size}rem;`}>
</div>
