<template>
  <Loading :active="isLoading" />
  <Headerbaner />
  <q-page-container class="bg-info">
    <div class="row container">
      <!-- 原先 router-view -->
      <div class="q-pa-md">
        <div class="q-pa-md mobile-none desktop-only">
          <q-item>
            <q-item-section side>
              <q-icon class="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-triangle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857
                    11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889
                    0-1.437-.99-.98-1.767L7.022 1.566z"
                  />
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section class="text-h6">熱門城市</q-item-section>
          </q-item>
        </div>
        <div class="q-pa-md mobile-none desktop-only">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            arrows
            height="240px"
            class="bg-info"
          >
            <q-carousel-slide :name="1" class="column">
              <div class="row fit column items-center q-gutter-xs q-col-gutter">
                <template v-for="(item, key) in randomAry[0]" :key="item.ID">
                  <div
                    v-if="key % 3 === 0"
                    class="col-2"
                    style="
                      width: 177px;
                      height: 200px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${item.Picture.PictureUrl1})`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                  <div
                    v-else
                    class="col-1"
                    style="
                      width: 185px;
                      height: 100px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${
                        ` ${item.Picture.PictureUrl1} ` ||
                        'https://cdn.quasar.dev/img/mountains.jpg'
                      })`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                </template>
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="column">
              <div class="row fit column items-center q-gutter-xs q-col-gutter">
                <template v-for="(item, key) in randomAry[1]" :key="item.ID">
                  <div
                    v-if="key % 3 === 0"
                    class="col-2"
                    style="
                      width: 177px;
                      height: 200px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${item.Picture.PictureUrl1})`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                  <div
                    v-else
                    class="col-1"
                    style="
                      width: 185px;
                      height: 100px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${
                        ` ${item.Picture.PictureUrl1} ` ||
                        'https://cdn.quasar.dev/img/mountains.jpg'
                      })`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                </template>
              </div>
            </q-carousel-slide>
            <q-carousel-slide :name="3" class="column">
              <div class="row fit column items-center q-gutter-xs q-col-gutter">
                <template v-for="(item, key) in randomAry[2]" :key="item.ID">
                  <div
                    v-if="key % 3 === 0"
                    class="col-2"
                    style="
                      width: 177px;
                      height: 200px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${item.Picture.PictureUrl1})`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                  <div
                    v-else
                    class="col-1"
                    style="
                      width: 185px;
                      height: 100px;
                      max-width: 100%;
                      max-height: 100%;
                      background-position: center;
                      background-size: cover;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                    :style="{
                      backgroundImage: `url(${
                        ` ${item.Picture.PictureUrl1} ` ||
                        'https://cdn.quasar.dev/img/mountains.jpg'
                      })`,
                    }"
                  >
                    <q-icon name="place" class="text-white"></q-icon>
                    <div style="font-weight: bold" class="text-white">
                      {{ item.City }}
                    </div>
                  </div>
                </template>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <q-item>
          <q-item-section side>
            <q-icon class="text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857
                  11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889
                  0-1.437-.99-.98-1.767L7.022 1.566z"
                />
              </svg>
            </q-icon>
          </q-item-section>
          <q-item-section class="text-h6">熱門活動</q-item-section>
        </q-item>
        <div class="row justify-between q-gutter-x-xs q-gutter-y-xl q-mb-lg">
          <div
            class="drop-shadow row my-card"
            v-for="item in activedata"
            :key="item.ID"
          >
            <div
              class="col-md-4 col-xs-12 q-pa-md column justify-center bg-white"
            >
              <q-img
                :src="item.Picture.PictureUrl1"
                :alt="item.ActivityName"
                style="height: 196px; max-height: 100%"
              />
            </div>
            <div
              class="col-md-8 col-xs-12 q-pa-md column justify-around bg-white"
            >
              <p
                class="ellipsis-2-lines"
                style="font-size: 1rem; font-weight: bold"
              >
                {{ item.ActivityName }}
              </p>
              <p class="ellipsis-3-lines">
                {{ item.Description }}
              </p>
              <div class="row justify-between">
                <div>
                  <q-icon name="place" class="text-primary"></q-icon>
                  <span style="font-weight: bold">{{ item.Location }}</span>
                </div>
                <q-btn
                  to="/"
                  label="活動詳情"
                  outline
                  color="primary"
                  @click="detail(item)"
                />
              </div>
            </div>
          </div>
        </div>
        <q-item>
          <q-item-section side>
            <q-icon name="square" class="text-secondary"></q-icon>
          </q-item-section>
          <q-item-section class="text-h6">熱門餐飲</q-item-section>
        </q-item>
        <div
          class="
            q-pa-md
            row
            justify-between
            items-start
            q-gutter-x-xs q-gutter-y-xl q-mb-lg
          "
        >
          <div
            class="drop-shadow column col-md-2 col-xs-5 justify-between"
            style="max-height: 243px"
            v-for="item in fooddata"
            :key="item.ID"
          >
            <q-img
              :src="item.Picture.PictureUrl1"
              :alt="item.RestaurantName"
              style="height: 137px; border: 12px solid #fff"
              fit="cover"
            />
            <div class="column justify-between bg-white">
              <div
                class="ellipsis q-px-md"
                style="line-height: 1.5; max-width: 130px"
              >
                {{ item.RestaurantName }}
              </div>
              <div class="text-subtitle2 q-px-md" style="line-height: 3">
                <q-icon name="place" class="text-primary"></q-icon>
                <span class="text-accent">{{ item.City }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-pa-md justify-center">
      Taiwan Tourguide © Code: Michael / Design: KT
    </div>
  </q-page-container>
  <q-dialog v-model="alert">
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-bar>
      <img
        :src="detailData.Picture.PictureUrl1"
        style="
          width: 100%;
          height: 459px;
          object-fit: cover;
          border: 12px solid #fff;
        "
      />
      <q-card-section>
        <div class="text-h6">{{ detailData.ActivityName }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none scroll" style="height: 100px">
        {{ detailData.Description }}
      </q-card-section>
      <q-card-section>
        <q-item>
          <q-item-section side>
            <q-icon name="schedule" class="text-primary"></q-icon>
          </q-item-section>
          <q-item-section v-if="detailData.Cycle">
            {{ detailData.Cycle }}
          </q-item-section>
          <q-item-section v-else>
            {{ detailData.StartTime.split("T")[0] }}
            ~ {{ detailData.EndTime.split("T")[0] }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>
            <q-icon name="place" class="text-primary"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ detailData.Address }}
          </q-item-section>
        </q-item>
        <q-item v-if="detailData.Phone">
          <q-item-section side>
            <q-icon name="call" class="text-primary"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ detailData.Phone }}
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import Headerbaner from '../components/HeaderBaner.vue';

export default {
  name: 'Home',
  components: { Headerbaner },
  setup() {
    const axios = inject('axios'); // inject axios
    const leftDrawerOpen = ref(false);
    const slide = ref(1);
    const localdata = ref({});
    const activedata = ref({});
    const fooddata = ref({});
    const search = ref(null);
    const selectCategory = ref(null);
    const selectLocation = ref(null);
    const restaurant = ref(null);
    const location = ref({ value: [] });
    const category = ref({ value: [] });
    const randomAry = ref({ value: [] });
    const isLoading = ref(null);
    const alert = ref(false);
    const detailData = ref({});
    const hotCity = (city, item) => {
      if (!city) {
        return;
      }
      const random = city.sort(() => Math.random() - 0.5);
      let temp = [];
      const save = [];
      random.filter((el) => {
        item.forEach((i) => {
          if (i.City.indexOf(el) === 0) {
            temp = i;
          }
        });
        save.push(temp);
        return save;
      });
      // eslint-disable-next-line consistent-return
      const ary = [save.slice(0, 7), save.slice(7, 14), save.slice(14, 21)];
      randomAry.value = ary;
    };
    const getLocalData = () => {
      isLoading.value = true;
      axios
        .get('https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot')
        .then((res) => {
          const tempdata = res.data;
          const City = tempdata.filter((el) => el.City);
          const NoCity = tempdata.filter((el) => !el.City);
          const CityItem = [];
          NoCity.forEach((el) => {
            if (el.Address) {
              el.City = el.Address.slice(0, 3);
            } else {
              el.City = undefined;
            }
          });
          const temp = [...City, ...NoCity];
          localdata.value = temp.filter((i) => i.Picture.PictureUrl1);
          localdata.value.forEach((el) => {
            CityItem.push(el.City);
          });
          const filterCity = CityItem.filter(
            (item, key, arr) => arr.indexOf(item) === key,
          );
          location.value = filterCity;
          hotCity(filterCity, localdata.value);
          isLoading.value = false;
        });
    };
    const getActiveData = () => {
      axios
        .get('https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity')
        .then((res) => {
          const temp = res.data.filter((i) => i.Picture.PictureUrl1);
          const random = temp.sort(() => Math.random() - 0.5);
          const ary = random.slice(0, 4);
          activedata.value = ary;
        });
    };
    const getFoodData = () => {
      axios
        .get('https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant')
        .then((res) => {
          const temp = res.data.filter((i) => i.Picture.PictureUrl1);
          const random = temp.sort(() => Math.random() - 0.5);
          const ary = random.slice(0, 10);
          fooddata.value = ary;
        });
    };
    const detail = (item) => {
      alert.value = true;
      detailData.value = item;
    };
    onMounted(() => {
      getLocalData();
      getActiveData();
      getFoodData();
    });
    return {
      leftDrawerOpen,
      slide,
      localdata,
      activedata,
      fooddata,
      restaurant,
      location,
      search,
      selectCategory,
      selectLocation,
      category,
      hotCity,
      randomAry,
      alert,
      detail,
      detailData,
      isLoading,
    };
  },
};
</script>
<style>
@media (max-width: 768px) {
  .mobile-none {
    display: none;
  }
}
</style>
