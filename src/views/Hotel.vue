<template>
  <Loading :active="isLoading" />
  <q-page-container class="bg-info">
    <div class="row container">
      <div class="q-pa-md col-md-12 q-gutter-md">
        <q-item>
          <q-item-section side>
            <q-icon name="square" class="text-secondary" ></q-icon>
          </q-item-section>
          <q-item-section class="text-h6">熱門美食</q-item-section>
        </q-item>
        <div class="q-pa-md">
          <div class="row justify-between items-start q-gutter-x-xs q-gutter-y-xl q-mb-lg">
            <div class="drop-shadow column my-card col-md-2 justify-between"
            style="height:243px;" v-for="item in fooddata" :key="item.ID"
            >
              <q-img :src="item.Picture.PictureUrl1" :alt="item.RestaurantName"
              style="height:137px;border:12px solid #fff"
              fit="cover"
              />
              <div class="column col bg-white q-pa-md">
                <div >{{ item.RestaurantName }}</div>
                <div class="text-subtitle2">
                  <q-icon name="place" class="text-primary"></q-icon>
                  <span class="text-accent">{{item.City}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-item>
          <q-item-section side>
            <q-icon name="square" class="text-secondary" ></q-icon>
          </q-item-section>
          <q-item-section class="text-h6">推薦住宿</q-item-section>
        </q-item>
        <div class="q-pa-md">
          <div class="row justify-between items-start q-gutter-x-xs q-gutter-y-xl q-mb-lg">
            <div class="drop-shadow column my-card col-md-2 justify-between"
            style="height:243px;" v-for="item in hoteldata" :key="item.ID"
            >
              <q-img :src="item.Picture.PictureUrl1" :alt="item.RestaurantName"
              style="height:137px;border:12px solid #fff"
              fit="cover"
              />
              <div class="column col bg-white q-pa-md">
                <div >{{ item.HotelName }}</div>
                <div class="text-subtitle2">
                  <q-icon name="place" class="text-primary"></q-icon>
                  <span class="text-accent">{{item.City}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import {
  ref,
  onMounted,
  inject,
} from 'vue';
import JSSHA from 'jssha';

export default {
  setup() {
    const fooddata = ref({});
    const hoteldata = ref({});
    const category = ref(null);
    const isLoading = ref(null);
    const axios = inject('axios');// inject axios
    const getAuthorizationHeader = () => {
      //  填入自己 ID、KEY 結束
      const GMTString = new Date().toGMTString();
      const ShaObj = new JSSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(process.env.VUE_APP_APIKEY, 'TEXT');
      ShaObj.update(`x-date: ${GMTString}`);
      const HMAC = ShaObj.getHMAC('B64');
      const Authorization = `hmac username="${process.env.VUE_APP_ID}",algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"'`;
      return { Authorization, 'X-Date': GMTString };
    };
    const getHotelData = () => {
      isLoading.value = true;
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 10);
        hoteldata.value = ary;
        isLoading.value = false;
      });
    };
    const getFoodData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        // eslint-disable-next-line
          console.log(res);
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 10);
        fooddata.value = ary;
      });
    };
    onMounted(() => {
      getHotelData();
      getFoodData();
    });
    return {
      hoteldata,
      fooddata,
      category,
      isLoading,
    };
  },
};
</script>
