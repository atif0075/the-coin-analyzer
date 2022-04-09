<template>
  <Content />
  <section v-if="show">
    <Loading />
  </section>
  <main v-else>
    <section
     
      class="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 px-4 md:px-20 lg:px-44"
    >
      <div
        v-for="items in list"
        :key="items"
        class="relative block p-8 overflow-hidden glass rounded-lg"
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
          <div>
            <img
              class="object-cover w-16 h-16 bg-white rounded-lg shadow-sm"
              :src="items.url"
              alt=""
            />
          </div>
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
        class="px-10 py-2 bg-purple rounded font-bold text-white text-base"
        @click="showMore"
      >
        {{ text }}
      </button>
    </main>
  </main>
  <main>
    <BackTop />
  </main>
</template>

<script lang="ts" setup>
let list = ref([]);

let show = ref(true);
let limit = ref(12);
let text = ref("Next");
let obj: any = {};
onMounted(() => {
  fetchReq();
});
const showMore = () => {
  if (limit.value <= 80) {
    limit.value += 12;
    fetchReq();
  } else {
    text.value = "All data has been loaded";
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
        url: `https://www.cryptocompare.com/${data.Data[i].CoinInfo.ImageUrl}`,
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

let userHasScrolled = ref(false);
const isWinScroll = () => {
  if (process.browser) {
    window.addEventListener("scroll", (e) => {
      userHasScrolled.value = true;
    });
    console.log(userHasScrolled.value);
  }
  if (process.browser) {
    console.log(window.innerWidth, window.innerHeight);
  }
};
</script>

<style lang="postcss">
.glass {
  @apply bg-[#ffffffe0] rounded-[16px] border;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
