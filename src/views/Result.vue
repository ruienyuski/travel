<template>
  <q-item>
    <q-item-section side>
      <q-icon name="square" :class="categoryColor" ></q-icon>
    </q-item-section>
    <q-item-section class="text-h6">{{category}}</q-item-section>
  </q-item>
  <div class="q-pa-md row justify-between items-start q-gutter-md">
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
    const getCategoryCountry = () => {
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${route.params.item}/${route.params.city}`).then((res) => {
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
