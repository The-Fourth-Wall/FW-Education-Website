<script lang="ts">
  import {onMount} from "svelte";

  onMount(() => {
    const cards = document.querySelectorAll<HTMLDivElement>(
      '[id="02-molecules/CourseCard.astro"]',
    );
    const edge_threshold = 150;

    document.addEventListener("mousemove", (e: MouseEvent) => {
      const global_x = e.clientX;
      const global_y = e.clientY;

      cards.forEach((card: HTMLDivElement) => {
        const rect = card.getBoundingClientRect();

        const is_hovering =
          global_x >= rect.left &&
          global_x <= rect.right &&
          global_y >= rect.top &&
          global_y <= rect.bottom;

        if (is_hovering) {
          const x = global_x - rect.left;
          const y = global_y - rect.top;

          card.style.backgroundImage = `
          radial-gradient(
            1200px circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.09),
            rgba(255, 255, 255, 0.03) 10%,
            rgba(255, 255, 255, 0.01) 15%
          )
        `;
        } else {
          const dist_to_left = Math.abs(global_x - rect.left);
          const dist_to_right = Math.abs(global_x - rect.right);
          const dist_to_top = Math.abs(global_y - rect.top);
          const dist_to_bottom = Math.abs(global_y - rect.bottom);

          const min_distance = Math.min(
            dist_to_left,
            dist_to_right,
            dist_to_top,
            dist_to_bottom,
          );

          if (min_distance < edge_threshold) {
            const x = global_x - rect.left;
            const y = global_y - rect.top;

            const intensity = 1 - min_distance / edge_threshold;

            card.style.backgroundImage = `
            radial-gradient(
              1200px circle at ${x}px ${y}px,
              rgba(255, 255, 255, ${0.09 * intensity}),
              rgba(255, 255, 255, ${0.03 * intensity}) 10%,
              rgba(255, 255, 255, 0) 16%
            )
          `;
          } else {
            card.style.backgroundImage = "none";
          }
        }
      });
    });
  });
</script>
