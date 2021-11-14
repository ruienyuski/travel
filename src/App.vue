<template>
  <q-layout view="lHh Lpr lFf">
  <div class="row justify-between q-pb-md">
    <q-img
      src="./assets/logo_desktop.png"
      spinner-color="white"
      style="height: 57px; max-width: 99px"
    />
    <div class="row">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">▲</q-avatar>
        </q-item-section>
        <q-item-section>台灣景點</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" font-size="18px" icon="square" />
        </q-item-section>
        <q-item-section>美食住宿</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar color="accent" text-color="white" font-size="18px" icon="circle" />
        </q-item-section>
        <q-item-section>景點交通</q-item-section>
      </q-item>
    </div>

  </div>

  <div class="q-pb-md q-gutter-md drop-shadow">
    <div class="row justify-between">

    <q-parallax
      src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="column">
        <div class="q-pa-md text-white">
          <h1>
            <img src="./assets/main_title.png" alt="">
          </h1>
          <p>台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
        </div>
        <div class="q-pa-md">
          <q-select
            label="搜尋關鍵字"
            filled
            v-model="select"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
          />
          <q-icon name="font_download" style="font-size: 4rem;" />
          <div class="q-gutter-md">
            <div class="row justify-center">
              <q-select v-model="select" class="col-md-4" :options="category" label="類別" />
              <q-select v-model="select" class="col-md-3" :options="location" label="不分縣市" />
              <q-icon name="font_download" class="col-md-2" style="font-size: 4rem;" />
            </div>
          </div>
        </div>
      </div>
    </q-parallax>
    </div>
  </div>
    <q-page-container>
      <div class="row justify-center">
        <div class="q-pa-md">
          <q-item>
            <q-item-section side >
              <q-icon class="text-primary" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                  d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857
                  11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889
                  0-1.437-.99-.98-1.767L7.022 1.566z"/>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>熱門城市</q-item-section>
          </q-item>
          <div class="q-pa-md">
            <q-carousel
              v-model="slide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              control-color="primary"
              padding
              arrows
              height="300px"
              class="bg-grey-1 shadow-2 rounded-borders"
            >
              <q-carousel-slide :name="1" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img v-for="item in randomAry[0]"
                  :key="item.ID" :src="item.Picture.PictureUrl1 || 'https://cdn.quasar.dev/img/mountains.jpg'" />
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="2" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img v-for="item in randomAry[1]"
                  :key="item.ID" :src="item.Picture.PictureUrl1 || 'https://cdn.quasar.dev/img/mountains.jpg'" />
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="3" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img v-for="item in randomAry[2]"
                  :key="item.ID" :src="item.Picture.PictureUrl1 || 'https://cdn.quasar.dev/img/mountains.jpg'" />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
          <q-item>
            <q-item-section side >
              <q-icon class="text-primary" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                  d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857
                  11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889
                  0-1.437-.99-.98-1.767L7.022 1.566z"/>
                </svg>
              </q-icon>
            </q-item-section>
            <q-item-section>熱門活動</q-item-section>
          </q-item>
          <div class="q-pa-md row justify-start items-start q-gutter-md ">
            <q-card class="my-card drop-shadow"
            flat bordered v-for="item in activedata" :key="item.ID">
              <q-card-section horizontal>
                <q-img
                  class="col-5"
                  :src="item.Picture.PictureUrl1"
                  style="max-height:196px;"
                />
                <q-card-section>
                  <p style="font-size: 1rem; font-weight:bold;">{{ item.Name }}</p>
                  <p class="ellipsis-3-lines">
                    {{item.Description}}
                  </p>
                  <div class="row justify-between">
                    <div>
                      <q-icon name="place" class="text-primary"></q-icon>
                      <span style="font-weight:bold;">{{item.Location}}</span>
                    </div>
                    <q-btn to="/" label="活動詳情" outline color="primary" />
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
          <q-item>
            <q-item-section side>
              <q-icon name="square" class="text-secondary" ></q-icon>
            </q-item-section>
            <q-item-section>熱門餐飲</q-item-section>
          </q-item>
          <div class="q-pa-md row justify-start items-start q-gutter-md">
            <q-card class="my-card2 drop-shadow col-md-2"
            style="height:243px;" v-for="item in fooddata" :key="item.ID">
              <img :src="item.Picture.PictureUrl1"
              style="height:137px;object-fit: cover;border:12px solid #fff">
              <q-card-section>
                <div >{{ item.Name }}</div>
                <div class="text-subtitle2">
                  <q-icon name="place" class="text-primary"></q-icon>
                  <span class="text-accent">{{item.City}}</span>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ lorem }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row justify-center">
          Taiwan Tourguide  © Code: Michael  /  Design: KT
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style>
  .my-card {
    width: 100%;
    max-width: 685px;
  }
  .my-card2 {
    width: 100%;
    max-width: 250px;
  }
  .drop-shadow {
    position: relative;
    background: #fff;
    border-radius: 4px;
    color: rgba(0,0,0, .8);
    line-height: 1.5;
  }
  .drop-shadow:before, .drop-shadow:after {
    -webkit-box-shadow: 0 15px 10px rgba(0,0,0, .7);
    -moz-box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    -o-transform: rotate(-3deg);
    position: absolute;
    left: 10px;
    bottom: 15px;
    z-index: -1;
    width: 50%;
    max-width: 300px;
    height: 20%;
    content: "";
  }

  .drop-shadow::after {
    transform: rotate(3deg);
    right: 10px;
    left: auto;
  };
</style>
<script>
import {
  ref,
  onMounted,
  inject,
} from 'vue';
import JSSHA from 'jssha';

export default {
  name: 'LayoutDefault',
  setup() {
    const axios = inject('axios');// inject axios
    const leftDrawerOpen = ref(false);
    const slide = ref(1);
    const localdata = ref({});
    const activedata = ref({});
    const fooddata = ref({});
    const lorem = ref('');
    const select = ref(null);
    const restaurant = ref(null);
    const location = ref({ value: [] });
    const category = ref({ value: [] });
    const randomAry = ref({ value: [] });

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
    const hotCity = (city, item) => {
      if (!city) { return; }
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
      const ary = [
        save.slice(0, 7),
        save.slice(7, 14),
        save.slice(14, 21),
      ];
      randomAry.value = ary;
    };
    const getLocalData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        // eslint-disable-next-line
        console.log('res', res);
        const tempdata = res.data;
        const City = tempdata.filter((el) => el.City);
        const NoCity = tempdata.filter((el) => !el.City);
        const CityItem = [];
        NoCity.forEach((el) => {
          if (el.Address.match('縣')) {
            el.City = el.Address.slice(0, 3);
          } else {
            el.City = el.Address.slice(0, 3);
          }
        });
        const temp = [...City, ...NoCity];
        localdata.value = temp.filter((i) => i.Picture.PictureUrl1);
        localdata.value.forEach((el) => {
          CityItem.push(el.City);
        });
        const filterCity = CityItem.filter((item, key, arr) => arr.indexOf(item) === key);
        location.value = filterCity;
        category.value = ['景點', '住宿', '活動'];
        hotCity(filterCity, localdata.value);
      });
    };
    const getActiveData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity').then((res) => {
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 4);
        activedata.value = ary;
      });
    };
    const getFoodData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant').then((res) => {
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 10);
        fooddata.value = ary;
        // eslint-disable-next-line
        console.log('temp',temp);
      });
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
      select,
      category,
      hotCity,
      randomAry,
      lorem,
    };
  },

};
</script>
