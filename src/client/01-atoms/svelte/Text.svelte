<script lang="ts">
  import "../styles/Text.css";

  let {label, size, type, color} = $props<{
    label: string;
    size: number;
    type: "primary" | "secondary" | "accent";
    color: string;
  }>();
</script>

<span
  class={`text ${type}`}
  style={`--text-font-size: ${size}rem; --text-color: ${color};`}>
  {label}
</span>
