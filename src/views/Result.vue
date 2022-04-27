<template>
    <Headerbaner />
    <q-page-container>
      <div class="row container">
        <div class="q-pa-md col-md-12 q-gutter-md">
          <q-item>
            <q-item-section side>
              <q-icon name="square" :class="categoryColor" ></q-icon>
            </q-item-section>
            <q-item-section class="text-h6">{{category}}</q-item-section>
          </q-item>
        </div>
        <div v-if="fooddata.length < 5" class="q-pa-md row items-start q-gutter-md">
          <q-card class=" my-card drop-shadow col"
          v-for="item in fooddata" :key="item.ID">
            <img :src="item.Picture.PictureUrl1"
            style="height:180px;object-fit: cover;border:12px solid #fff">
            <q-card-section>
              <div >{{ item.HotelName }}</div>
              <div class="text-subtitle2">
                <q-icon name="place" class="text-primary"></q-icon>
                <span class="text-accent">{{item.City}}</span>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-else class="q-pa-md row justify-start items-start q-gutter-md">
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
      </div>
      <div class="row q-pa-md justify-center">
        Taiwan Tourguide  © Code: Michael  /  Design: KT
      </div>
    </q-page-container>
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
import Headerbaner from '../components/HeaderBaner.vue';

export default {
  components: { Headerbaner },
  setup() {
    const route = useRoute();
    const selectCategory = ref(null);
    const selectLocation = ref(null);
    const fooddata = ref({});
    const category = ref(null);
    const categoryColor = ref(null);
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
    const getCategoryCountry = () => {
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${route.params.item}/${route.params.city}`,
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        switch (route.params.item) {
          case 'Restaurant':
            category.value = '餐飲';
            categoryColor.value = 'text-accent';
            break;
          case 'Hotel':
            category.value = '住宿';
            categoryColor.value = 'text-secondary';
            break;
          case 'Activity':
            category.value = '活動';
            categoryColor.value = 'text-primary';
            break;
          default:
            category.value = '';
            categoryColor.value = '';
        }
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 10);
        fooddata.value = ary;
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
