<template>
  <main v-show="showBTN" class="relative">
    <button
      type="button"
      @click="backToTop"
      class="fixed left-0 sm:left-3 md:left-10 bottom-4 bg-purple p-5"
    >
      <svg
        class="w-6 h-6 text-white"
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
const showBTN = ref(false);
const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// show back to top button when scroll down the page and hide it when scroll up
onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      showBTN.value = true;
    } else {
      showBTN.value = false;
    }
  });
});
</script>
