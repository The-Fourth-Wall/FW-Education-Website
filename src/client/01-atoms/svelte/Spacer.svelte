<script lang="ts">
  let {size} = $props<{
    size: number;
  }>();
</script>

<div style={`height: ${size}rem; width: ${size}rem`}></div>
