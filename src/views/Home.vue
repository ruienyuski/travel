<template>
    <div class="q-pa-md">
      <div class="q-pa-md mobile-none desktop-only">
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
        >
          <q-carousel-slide :name="1" class="column ">
            <div class="row fit column  items-center q-gutter-xs q-col-gutter">
              <template  v-for="(item, key) in randomAry[0]" :key="item.ID">
                <div v-if="key % 3 === 0" class="col-2"
                style="width:177px; height:200px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${item.Picture.PictureUrl1})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
                <div v-else class="col-1"
                style="width:185px; height:100px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${ ` ${item.Picture.PictureUrl1} ` || 'https://cdn.quasar.dev/img/mountains.jpg'})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
              </template>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column ">
            <div class="row fit column  items-center q-gutter-xs q-col-gutter">
              <template  v-for="(item, key) in randomAry[1]" :key="item.ID">
                <div v-if="key % 3 === 0" class="col-2"
                style="width:177px; height:200px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${item.Picture.PictureUrl1})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
                <div v-else class="col-1"
                style="width:185px; height:100px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${ ` ${item.Picture.PictureUrl1} ` || 'https://cdn.quasar.dev/img/mountains.jpg'})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
              </template>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column ">
            <div class="row fit column  items-center q-gutter-xs q-col-gutter">
              <template  v-for="(item, key) in randomAry[2]" :key="item.ID">
                <div v-if="key % 3 === 0" class="col-2"
                style="width:177px; height:200px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${item.Picture.PictureUrl1})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
                <div v-else class="col-1"
                style="width:185px; height:100px;
                max-width:100%; max-height:100%;
                background-position: center;background-size: cover;
                display: flex; flex-direction:column;
                justify-content: center;align-items: center;"
                :style="{backgroundImage:`url(${ ` ${item.Picture.PictureUrl1} ` || 'https://cdn.quasar.dev/img/mountains.jpg'})`}"
                >
                  <q-icon name="place" class="text-white"></q-icon>
                  <div style="font-weight:bold;" class="text-white">{{item.City}}</div>
                </div>
              </template>
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
        <q-item-section class="text-h6">熱門活動</q-item-section>
      </q-item>
      <div class="q-pa-md row justify-between items-start q-gutter-md ">
        <q-card class="my-card drop-shadow col-md-5"
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
        <q-item-section class="text-h6">熱門餐飲</q-item-section>
      </q-item>
      <div class="q-pa-md row justify-between items-start q-gutter-md">
        <q-card class="my-card drop-shadow col-md-2"
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
        </q-card>
      </div>
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
  name: 'Home',
  setup() {
    const axios = inject('axios');// inject axios
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
        hotCity(filterCity, localdata.value);
      });
    };
    const getActiveData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        const temp = res.data.filter((i) => i.Picture.PictureUrl1);
        const random = temp.sort(() => Math.random() - 0.5);
        const ary = random.slice(0, 4);
        activedata.value = ary;
      });
    };
    const getFoodData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
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
      search,
      selectCategory,
      selectLocation,
      category,
      hotCity,
      randomAry,
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
