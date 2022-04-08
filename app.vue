<script lang="ts" setup>
import "./assets/tailwind.css";
</script>

<template>
  <section class="bg-primary">
    <div class="container mx-auto min-h-screen">
      <Navbar />
      <NuxtPage />
    </div>
  </section>
</template>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap");
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-track {
  @apply bg-primary;
}
*::-webkit-scrollbar-thumb {
  @apply bg-purple;
}
</style>
