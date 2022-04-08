<template>
  <section>
    <div class="max-w-screen-xl mx-auto pb-12 lg:items-center lg:flex">
      <div class="max-w-xl mx-auto text-center">
        <h1 class="text-3xl font-serif text-green font-extrabold sm:text-5xl">
          The Coin Analyzer
        </h1>

        <p
          class="mt-4 pb-7 sm:leading-relaxed text-xs px-4 sm:text-sm text-black font-sans capitalize"
        >
          Instantly retrieve up-to-date crypto exchange rate data for more than
          385 cryptocurrencies, collected from 25+ exchanges.
        </p>
        <div class="px-2">
          <input
            @keyup="searchCoin"
            v-model="search"
            type="text"
            class="p-2 bg-light-primary w-full rounded bg-[#f8f8f8] border border-light-green border-dashed text-black outline-none"
          />
        </div>
      </div>
    </div>
  </section>
  <section v-if="show">
    <Loading />
  </section>
  <section
    v-if="!show"
    class="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 px-2 md:px-20 lg:px-44"
  >
    <div
      v-for="items in list"
      :key="items"
      class="relative block p-8 overflow-hidden border bg-white border-gray-100 rounded-lg"
    >
      <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
      ></span>

      <div class="justify-between flex">
        <div>
          <h5 class="text-xl font-bold text-black">
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

        <div class=" ">
          <img
            class="object-cover w-16 h-16 rounded-lg shadow-sm"
            :src="items.url"
            alt=""
          />
        </div>
      </div>

      <div class="mt-4 sm:pr-8">
        <p class="text-sm text-gray-500">
          Investing has the best results when you learn from nature. Planet
          Earth has been alive for much longer than you or I and and it this
          thing figured out
        </p>
      </div>

      <dl class="flex mt-6">
        <div class="flex flex-col-reverse">
          <dt class="text-sm font-medium text-gray-600">Highest Price</dt>
          <dd class="text-xs text-gray-500">{{ items.highPrice }}</dd>
        </div>

        <div class="flex flex-col-reverse ml-3 sm:ml-6">
          <dt class="text-sm font-medium text-gray-600">Last Update</dt>
          <dd class="text-xs text-gray-500">{{ items.date }}</dd>
        </div>
      </dl>
    </div>
  </section>
  <main class="flex justify-center items-center py-5">
    <button
      class="px-10 py-2 bg-light-green rounded font-bold text-black text-base"
      @click="showMore"
    >
      Next
    </button>
  </main>
  <main>
    <BackTop />
  </main>
</template>

<script lang="ts" setup>
let search = ref();
let list = ref([]);

let show = ref(true);
let limit = ref(12);

let obj: any = {};
onMounted(() => {
  fetchReq();
});
const showMore = () => {
  console.log(limit.value);

  if (limit.value <= 80) {
    limit.value += 12;
    fetchReq();
  } else {
    console.log("All data has been loaded");
  }
};

const fetchReq = async () => {
  let response = await fetch(
    `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=${limit.value}&tsym=USD`
  );
  let data = await response.json();
  list.value = [];
  // get the data from the api and store it in the list array using for loop and try catch
  for (let i = 0; i < data.Data.length; i++) {
    try {
      obj = {
        name: data.Data[i].CoinInfo.FullName,
        coin: data.Data[i].CoinInfo.Name,
        url: `https://www.cryptocompare.com/${data.Data[i].CoinInfo.ImageUrl}`,
        rate: data.Data[i].DISPLAY.USD.PRICE,
        highPrice: data.Data[i].DISPLAY.USD.HIGHDAY,
        date: data.Data[i].DISPLAY.USD.LASTUPDATE,
      };
    } catch (error) {
      obj = {
        name: data.Data[i].CoinInfo.FullName,
        coin: data.Data[i].CoinInfo.Name,
        url: data.Data[i].CoinInfo.ImageUrl,
        rate: "N/A",
        highPrice: "N/A",
        date: "Just Now",
      };
    }
    list.value.push(obj);
  }

  console.log(list.value);
  show.value = false;
};

const searchCoin = () => {};
</script>

<style></style>
