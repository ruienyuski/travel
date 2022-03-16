<template>
  <q-item>
    <q-item-section side>
      <q-icon name="square" class="text-secondary" ></q-icon>
    </q-item-section>
    <q-item-section class="text-h6">熱門美食</q-item-section>
  </q-item>
  <div class="q-pa-md row justify-between items-start q-gutter-md">
    <q-card class="my-card drop-shadow col-md-2"
    style="height:243px;" v-for="item in fooddata" :key="item.ID">
      <img :src="item.Picture.PictureUrl1"
      style="height:137px;object-fit: cover;border:12px solid #fff">
      <q-card-section>
        <div >{{ item.RestaurantName }}</div>
        <div class="text-subtitle2">
          <q-icon name="place" class="text-primary"></q-icon>
          <span class="text-accent">{{item.City}}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-item>
    <q-item-section side>
      <q-icon name="square" class="text-secondary" ></q-icon>
    </q-item-section>
    <q-item-section class="text-h6">推薦住宿</q-item-section>
  </q-item>
  <div class="q-pa-md row justify-between items-start q-gutter-md">
    <q-card class="my-card drop-shadow col-md-2"
    style="height:243px;" v-for="item in hoteldata" :key="item.ID">
      <img :src="item.Picture.PictureUrl1"
      style="height:137px;object-fit: cover;border:12px solid #fff">
      <q-card-section>
        <div >{{ item.HotelName }}</div>
        <div class="text-subtitle2">
          <q-icon name="place" class="text-primary"></q-icon>
          <span class="text-accent">{{item.City}}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
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
    const axios = inject('axios');// inject axios
    const getAuthorizationHeader = () => {
      //  填入自己 ID、KEY 開始
      const AppID = '42fc671988c54704a5a441cfed709ce5';
      const AppKey = 'KvV_xn7i63emNGaA4EstMe4wz7c';
      //  填入自己 ID、KEY 結束
      const GMTString = new Date().toGMTString();
      const ShaObj = new JSSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update(`x-date: ${GMTString}`);
      const HMAC = ShaObj.getHMAC('B64');
      const Authorization = `hmac username="${AppID}",algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"'`;
      return { Authorization, 'X-Date': GMTString };
    };
    const getHotelData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 10);
        hoteldata.value = ary;
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
    };
  },
};
</script>
