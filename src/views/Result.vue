<template>
    <Loading :active="isLoading" />
    <Headerbaner />
    <q-page-container  class="bg-info">
      <div class="row container">
        <div class="q-pa-md col-md-12">
          <q-item>
            <q-item-section side>
              <q-icon name="square" :class="categoryColor" ></q-icon>
            </q-item-section>
            <q-item-section class="text-h6">{{category}}</q-item-section>
          </q-item>
          <div class="q-pa-md col-md-12">
            <div v-if="resultdata.length < 5"
            class="row justify-between items-start q-gutter-x-xs q-gutter-y-xl">
              <div class="drop-shadow column col-md-4 col-xs-5 justify-between"
              style="height:243px;" v-for="item in resultdata" :key="item.ID"
              >
                <q-img :src="item.Picture.PictureUrl1" class="col-5" :alt="item.RestaurantName"
                style="height:137px;object-fit: cover;border:12px solid #fff"
                fit="cover"
                />
                <div class="column col-5 justify-between bg-white">
                  <div class="col-5 ellipsis q-px-md"
                  style="line-height:1.5;max-width: 180px;">
                  {{ item.HotelName|| item.RestaurantName || item.ActivityName }}
                  </div>
                  <div class="text-subtitle2 col-5 q-px-md"
                  style="line-height:3">
                    <q-icon name="place" class="text-primary"></q-icon>
                    <span class="text-accent">{{item.City}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else
            class="row justify-between items-start q-gutter-x-xs q-gutter-y-xl">
                <div class="drop-shadow column col-md-2 col-xs-5 justify-between"
                style="height:243px;" v-for="item in resultdata" :key="item.ID"
                >
                  <div v-if="!item.Picture.PictureUrl1"
                  style="height:137px;width:100%;border:12px solid #fff"
                  >
                    <div class="row justify-center items-center col-5"
                      style="height:117px;width:100%;background-color: #ffe2ec;"
                    >暫無圖片</div>
                  </div>
                  <q-img v-else :src="item.Picture.PictureUrl1" class="col-5"
                  :alt="item.RestaurantName"
                  style="height:137px;object-fit: cover;border:12px solid #fff"
                  fit="cover"
                  />
                  <div class="column col-5 justify-between bg-white">
                    <div class="col-5 ellipsis q-px-md"
                    style="line-height:1.5;max-width: 180px;">
                    {{ item.HotelName|| item.RestaurantName || item.ActivityName }}
                    </div>
                    <div class="text-subtitle2 col-5 q-px-md"
                    style="line-height:3">
                      <q-icon name="place" class="text-primary"></q-icon>
                      <span class="text-accent">{{item.City}}</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination class="q-pa-md justify-center" v-if="totalPages > 0" :pages="currentPage"
      :totalItem="totalPages" @emitpage="getList"></Pagination>
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
import Pagination from '../components/Pagination.vue';

export default {
  components: { Pagination },
  setup() {
    const route = useRoute();
    const selectCategory = ref(null);
    const selectLocation = ref(null);
    const resultdata = ref({});
    const category = ref(null);
    const categoryColor = ref(null);
    const isLoading = ref(null);
    const axios = inject('axios');// inject axios
    const currentPage = ref(0);
    const totalPages = ref(0);
    const pagenum = ref(0);
    const newData = ref([]);
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
    const getList = (index = 0) => {
      resultdata.value = newData.value[index];
    };
    const getCategoryCountry = () => {
      isLoading.value = true;
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
        // const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        // const random = temp.sort(() => Math.random() - 0.5);
        // const ary = random.slice(0, 10);
        // resultdata.value = ary;
        // resultdata.value = res.data;
        currentPage.value = 0;
        let tempdata = [];
        tempdata = res.data;
        tempdata.forEach((item, i) => {
          if (i % 10 === 0) {
            newData.value.push([]);
          }
          // eslint-disable-next-line radix
          pagenum.value = parseInt(i / 10);
          newData.value[pagenum.value].push(item);
          return newData.value;
        });
        totalPages.value = pagenum.value;
        isLoading.value = false;
        getList();
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
      resultdata,
      category,
      categoryColor,
      isLoading,
      currentPage,
      totalPages,
      newData,
      getList,
    };
  },
};
</script>
