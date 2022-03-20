<template>
  <div class="q-pa-md  q-gutter-md">
    <q-item>
      <q-item-section side>
        <q-icon name="square" :class="categoryColor" ></q-icon>
      </q-item-section>
      <q-item-section class="text-h6">{{category}}</q-item-section>
    </q-item>
  </div>
  <div class="q-pa-md row justify-start items-start q-gutter-md">
    <q-card class="my-card drop-shadow col-md-2"
    style="height:243px;" v-for="item in fooddata" :key="item.ID">
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
  watch,
} from 'vue';
import JSSHA from 'jssha';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const selectCategory = ref(null);
    const selectLocation = ref(null);
    const fooddata = ref({});
    const category = ref(null);
    const categoryColor = ref(null);
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
    const getCategoryCountry = () => {
      const city = 'Hsinchu';
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/Streaming/City/${city}`,
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        // eslint-disable-next-line
          console.log(res.data);
      });
    };
    watch(route, () => {
      getCategoryCountry();
    });
    onMounted(() => {
      getCategoryCountry();
    });
    return {
      getCategoryCountry,
      selectCategory,
      selectLocation,
      fooddata,
      category,
      categoryColor,
    };
  },
};
</script>
