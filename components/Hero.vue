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
    v-else
    class="grid md:grid-cols-3 grid-cols-2 gap-4 px-2 md:px-20 lg:px-44"
  >
    <div
      v-for="items in list"
      :key="items"
      class="relative block p-8 overflow-hidden border bg-white border-gray-100 rounded-lg"
    >
      <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
      ></span>

      <div class="justify-between sm:flex">
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

        <div class="flex-shrink-0 hidden ml-3 sm:block">
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
</template>

<script lang="ts" setup>
let search = ref();
let list = ref([]);
let show = ref(true);
const API_KEY = "bd2a11e007399e49b4410d30809298c9fc4d771c";
let obj: any = {};
onMounted(() => {
  fetchReq();
});
const fetchReq = async () => {
  const res = await fetch(
    `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}`,
    { mode: "no-cors" }
  );
  const data = await res.json();

  // get id ,name,logo_url,price from data and put in obj
  data.forEach((item: any) => {
    obj[item.id] = {
      coin: item.id,
      name: item.name,
      url: item.logo_url,
      rate: item.price,
      highPrice: item.high,
      date: dateReader(item.price_date),
    };
  });
  list.value = Object.values(obj);

  show.value = false;
};

const searchCoin = () => {
  const filtered = Object.values(obj).filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase());
  });
  list.value = filtered;
};
const dateReader = (date: any) => {
  // convert raw date to readable date
  const newDate = new Date(date);
  const options: any = {
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  return newDate.toLocaleDateString("en-US", options);
};
</script>

<style></style>
