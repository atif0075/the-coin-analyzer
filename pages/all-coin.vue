<template>
  <div v-if="showObj">
    <Loading />
  </div>
  <section
    v-if="!showObj"
    class="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 px-2 md:px-20 lg:px-44"
  >
    <div
      v-for="items in lists"
      :key="items"
      class="relative block p-8 overflow-hidden bg-white rounded-lg"
    >
      <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-[#6a36e4] via-[#a38ed3] to-[#4501e6]"
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
          {{ items.des }}
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
let lists = ref([]);
let object: any = {};
let showObj = ref(false);
let page = ref(1);
onMounted(() => {
  fetchData();
  console.log("hello");
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
      rate: data.Data[i].RAW.USD.PRICE,
      url: `https://www.cryptocompare.com/${data.Data[i].CoinInfo.ImageUrl}`,
      highPrice: data.Data[i].RAW.USD.HIGHDAY,
      date: data.Data[i].DISPLAY.USD.LASTUPDATE,
      des: data.Data[i].CoinInfo.Description,
    };
    lists.value.push(object);
  }
  console.log(lists.value);

  showObj.value = true;
  console.log("Hel");
};
</script>

<style></style>
