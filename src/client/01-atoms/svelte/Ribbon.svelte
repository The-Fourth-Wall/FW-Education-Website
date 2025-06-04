<script lang="ts">
  import "../styles/Ribbon.css";

  let {text, color} = $props<{
    text: string;
    color: string;
  }>();
</script>

<div class="ribbon" style={`--ribbon-color: ${color};`}>
  <span class="ribbon-text">{text}</span>
</div>
