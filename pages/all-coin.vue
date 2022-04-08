<template>
  <Loading v-if="!showObj" />
  <main class="px-2 md:px-20 lg:px-44 py-6" v-else>
    <h1 class="text-3xl font-serif text-white font-extrabold">All coins</h1>
    <section
      style="margin-top: 10px"
      class="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div
        v-for="items in lists"
        :key="items"
        class="relative block p-4 overflow-hidden bg-white rounded-lg"
      >
        <span
          class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#6a36e4] via-[#a38ed3] to-[#4501e6]"
        ></span>
        <div class="justify-between flex">
          <div>
            <h5 class="text-base font-bold text-black">
              {{ items.name }}
            </h5>
            <p
              class="mt-1 text-xs font-medium bg-light-black inline-block px-2 py-1 text-black rounded-full"
            >
              {{ items.coin }}
            </p>
            <div>
              <p
                class="mt-1 text-xs font-medium bg-rose-300 px-2 py-1 text-black inline-block rounded-full"
              >
                {{ items.rate }}
              </p>
            </div>
          </div>
          <div>
            <img
              class="object-cover w-16 h-16 rounded-lg shadow-sm"
              :src="items.url"
              alt=""
            />
          </div>
        </div>
       
        <dl class="flex mt-6">
          <div class="flex flex-col-reverse">
            <dt class="text-xs font-medium text-gray-600">Highest Price</dt>
            <dd class="text-xs text-gray-500">{{ items.highPrice }}</dd>
          </div>
          <div class="flex flex-col-reverse ml-3 sm:ml-6">
            <dt class="text-xs font-medium text-gray-600">Last Update</dt>
            <dd class="text-xs text-gray-500">{{ items.date }}</dd>
          </div>
        </dl>
      </div>
    </section>
    <section class="flex justify-center items-center">
      <div class="flex justify-center space-x-1">
        <button
          @click="prevPage"
          class="inline-flex items-center bg-white justify-center w-8 h-8 border border-gray-100 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div
          style="padding: 0 20px"
          class="bg-purple text-sm font-medium text-center flex justify-center items-center rounded"
        >
          <p class="text-xs text-white">{{ page }} of {{ totalPage }}</p>
        </div>

        <button
          @click="nextPage"
          class="inline-flex items-center bg-white justify-center w-8 h-8 border border-gray-100 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
let lists = ref([]);
let object: any = {};
let showObj = ref(false);
let page = ref(1);
let totalPage = ref(329);
onMounted(() => {
  fetchData();
});
const fetchData = async () => {
  const results = await fetch(
    `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD&page=${page.value}`
  );
  const data = await results.json();
  lists.value = [];
  for (let i = 0; i < data.Data.length; i++) {
    object = {
      name: data.Data[i].CoinInfo.FullName,
      coin: data.Data[i].CoinInfo.Name,
      rate: data.Data[i].DISPLAY.USD.PRICE,
      url: `https://www.cryptocompare.com/${data.Data[i].CoinInfo.ImageUrl}`,
      highPrice: data.Data[i].DISPLAY.USD.HIGHDAY,
      date: data.Data[i].DISPLAY.USD.LASTUPDATE,
    };
    lists.value.push(object);
  }
  console.log(lists.value);
  setTimeout(() => {
    showObj.value = true;
    console.log("Hel");
  }, 2000);
};
// create functions for the next and previous page
const nextPage = () => {
  if (page.value < totalPage.value) {
    page.value++;
    fetchData();
  }
};
const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchData();
  }
};
</script>

<style></style>
