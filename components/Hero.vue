<template>
  <section>
    <div class="max-w-screen-xl mx-auto pb-12 lg:items-center lg:flex">
      <div class="max-w-xl mx-auto text-center">
        <h1 class="text-3xl font-serif text-green font-extrabold sm:text-5xl">
          The Coin Analyzer
        </h1>

        <p
          class="mt-4 pb-7 sm:leading-relaxed text-xs px-4 sm:text-sm text-black  font-sans capitalize"
        >
          Instantly retrieve up-to-date crypto exchange rate data for more than
          385 cryptocurrencies, collected from 25+ exchanges.
        </p>
        <div class="px-2">
          <input
            @keyup="searchCoin"
            v-model="search"
            type="text"
            class="p-2 bg-light-primary w-full rounded bg-light-black border border-light-black border-dashed text-black outline-none"
          />
        </div>
      </div>
    </div>
  </section>
  <section v-if="show">
    <Loading />
  </section>
  <section
    v-else
    class="grid md:grid-cols-3 grid-cols-2 gap-4 px-2 md:px-20 lg:px-44"
  >
    <div
      v-for="items in list"
      :key="items"
      class="relative block py-8 px-3 bg-white md:px-8 border border-light-black shadow-xl rounded-xl overflow-auto"
    >
      <span
        class="absolute right-2 md:right-4 top-2 md:top-4 rounded-full px-3 py-1.5 bg-light-black font-medium text-xs"
      >
        {{ items.coin }}
      </span>

      <div class="mt-4 text-black sm:pr-8">
        <img class="w-10 h-10" :src="items.url" :alt="items.name" />

        <h5 class="mt-4 text-xl font-bold text-blue">{{ items.name }}</h5>

        <p class="hidden my-2 text-sm sm:block">
          Investing has the best results when you learn from nature
        </p>
      </div>
      <span
        class="absolute left-2 md:left-6 bottom-1 md:bottom-1 rounded-full px-3 py-1.5 bg-light-green font-medium text-xs"
      >
        $ {{ items.rate }}
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
let search = ref();
let list = ref([]);
let show = ref(true);
const API_KEY = "c6ca4403481f9737b2ade6035e9df273";
let obj: any = {};
onMounted(() => {
  fetchReq();
});
const fetchReq = async () => {
  const res = await fetch(
    `http://api.coinlayer.com/list?access_key=${API_KEY}`
  );
  const rates = await fetch(
    `http://api.coinlayer.com/live?access_key=${API_KEY}`
  );
  const data = await res.json();
  const rateData = await rates.json();
  const rate = rateData.rates;

  const crypto = data.crypto;

  const crypto_values = Object.values(crypto);
  const crypto_rates = Object.values(rate);
  // store the values in the list
  crypto_values.map((item, index) => {
    return {
      rate: crypto_rates[index],
    };
  });

  const crypto_names = crypto_values.map((item) => item.name);
  const crypto_url = crypto_values.map((item) => item.icon_url);
  const crypto_coins = crypto_values.map((item) => item.symbol);
  list.value = crypto_names;
  crypto_names.forEach((item, index) => {
    obj[item] = {
      name: item,
      url: crypto_url[index],
      coin: crypto_coins[index],
      rate: crypto_rates[index],
    };
  });
  list.value = obj;
  show.value = false;
};

const searchCoin = () => {
  console.log("Hello");

  const filtered = Object.values(obj).filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase());
  });
  list.value = filtered;
};
</script>

<style></style>
