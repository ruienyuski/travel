<template>
  <q-layout view="lHh Lpr lFf">
  <div class="row justify-between container q-py-md">
    <router-link  to="/">
    <img src="./assets/logo_desktop.png" alt="logo"
    style="height: 57px; max-width: 99px">
    </router-link>
    <div class="row">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">▲</q-avatar>
        </q-item-section>
        <q-item-section class="text-primary">台灣景點</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar color="secondary" text-color="white" font-size="18px" icon="square" />
        </q-item-section>
        <q-item-section class="text-secondary">美食住宿</q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-avatar color="accent" text-color="white" font-size="18px" icon="circle" />
        </q-item-section>
        <q-item-section class="text-accent">景點交通</q-item-section>
      </q-item>
    </div>

  </div>

  <div class="q-pb-md q-gutter-md drop-shadow">
    <div class="row justify-between">

    <q-parallax
      src="https://tour.yunlin.gov.tw/upload/shopInfo/20180823115544.jpg"
    >
      <div class="column">
        <div class="q-pa-md text-white">
          <h1>
            <img src="./assets/main_title.png" alt="">
          </h1>
          <p>台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
        </div>
        <div class="q-pa-md">
          <q-input bg-color="white" standout="bg-white" bottom-slots v-model="search" label="搜尋關鍵字">
            <template v-slot:after>
              <q-btn padding="md" color="primary"  icon="place"></q-btn>
            </template>
          </q-input>
          <div class="q-gutter-md">
            <div class="row justify-between">
              <q-select bg-color="white" standout="bg-white" outlined
              v-model="selectCategory" class="col-md-6"
              :options="category" label="類別" />
              <q-select bg-color="white" standout="bg-white" outlined
              v-model="selectLocation" class="col-md-6"
              :options="location" label="不分縣市" >
                <template v-slot:after>
                  <q-btn padding="md" color="primary"
                  icon="search" @click="getCategoryCountry()"></q-btn>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>
    </q-parallax>
    </div>
  </div>
    <q-page-container>
      <div class="row container">
        <router-view></router-view>
      </div>
      <div class="row q-pa-md justify-center">
        Taiwan Tourguide  © Code: Michael  /  Design: KT
      </div>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
@import './assets/app.scss';
  .my-card {
    width: 100%;
    max-width: 685px;
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
import { useRouter } from 'vue-router';

export default {
  name: 'LayoutDefault',
  setup() {
    const axios = inject('axios');// inject axios
    const router = useRouter();
    const localdata = ref({});
    const search = ref(null);
    const selectCategory = ref(null);
    const selectLocation = ref(null);
    const location = ref(null);
    const category = ref(null);
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
    const getLocalData = () => {
      axios.get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot',
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        const tempdata = res.data;
        const City = tempdata.filter((el) => el.City);
        const NoCity = tempdata.filter((el) => !el.City);
        const CityItem = [];
        NoCity.forEach((el) => {
          if (el.Address) {
            el.City = el.Address.slice(0, 3);
          } else {
            el.City = null;
          }
        });
        const temp = [...City, ...NoCity];
        localdata.value = temp.filter((i) => i.Picture.PictureUrl1);
        localdata.value.forEach((el) => {
          CityItem.push(el.City);
        });
        const filterCity = CityItem.filter((item, key, arr) => arr.indexOf(item) === key);
        location.value = filterCity;
        category.value = ['餐飲', '住宿', '活動'];
      });
    };
    const getCategoryCountry = () => {
      let item = '';
      let city = '';
      switch (selectCategory.value) {
        case '餐飲':
          item = 'Restaurant';
          break;
        case '住宿':
          item = 'Hotel';
          break;
        case '活動':
          item = 'Activity';
          break;
        default:
          item = '';
      }
      switch (selectLocation.value) {
        case '臺北市':
          city = 'Taipei';
          break;
        case '新北市':
          city = 'NewTaipei';
          break;
        case '桃園市':
          city = 'Taoyuan';
          break;
        case '臺中市':
          city = 'Taichung';
          break;
        case '臺南市':
          city = 'Tainan';
          break;
        case '高雄市':
          city = 'Kaohsiung';
          break;
        case '基隆市':
          city = 'Keelung';
          break;
        case '新竹市':
          city = 'Hsinchu';
          break;
        case '新竹縣':
          city = 'HsinchuCounty';
          break;
        case '苗栗縣':
          city = 'MiaoliCounty';
          break;
        case '彰化縣':
          city = 'ChanghuaCounty';
          break;
        case '南投縣':
          city = 'NantouCounty';
          break;
        case '雲林縣':
          city = 'YunlinCounty';
          break;
        case '嘉義縣':
          city = 'ChiayiCounty';
          break;
        case '嘉義市':
          city = 'Chiayi';
          break;
        case '屏東縣':
          city = 'PingtungCounty';
          break;
        case '宜蘭縣':
          city = 'YilanCounty';
          break;
        case '花蓮縣':
          city = 'HualienCounty';
          break;
        case '臺東縣':
          city = 'TaitungCounty';
          break;
        case '金門縣':
          city = 'KinmenCounty';
          break;
        case '澎湖縣':
          city = 'PenghuCounty';
          break;
        case '連江縣':
          city = 'LienchiangCounty';
          break;
        default:
          city = '';
      }
      if (item !== '' && city !== '') {
        router.push(`/result/${item}/${city}`);
      } else {
        router.push('/');
      }
    };
    onMounted(() => {
      getLocalData();
    });
    return {
      location,
      localdata,
      search,
      category,
      selectCategory,
      selectLocation,
      getCategoryCountry,
    };
  },
};
</script>
