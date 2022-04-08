<template>
  <main class="relative">
    <button
      type="button"
      @click="backToTop"
      class="fixed bottom-4 bg-light-black p-5"
    >
      <svg
        class="w-6 h-6 text-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7l4-4m0 0l4 4m-4-4v18"
        ></path>
      </svg>
    </button>
  </main>
</template>

<script lang="ts" setup>
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style></style>
