<template>
    <!-- 平板 -->
    <div class="q-pa-md col-12 desktop-hide" >
      <div class="q-gutter-md">
        <div class="row justify-between">
          <q-select bg-color="white" standout="bg-white" outlined
          v-model="selectCategory" class="col-md-6 col-12"
          :options="category" label="類別" />
          <q-select bg-color="white" standout="bg-white" outlined
          v-model="selectLocation" class="col-md-6 col-12"
          :options="location" label="選擇縣市" >
            <template v-slot:after>
              <q-btn padding="md" color="primary"
              icon="search" @click="getCategoryCountry()"></q-btn>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <!-- 桌面 -->
    <div class="desktop-only drop-shadow">
      <q-parallax
        class="q-pa-md bg-white"
      >
        <div
        style="background:url(https://www.taiwan.net.tw/att/event/6fe79462-ec06-41fc-8f6e-291250981bbb.jpg);
        background-position: center;
        background-size:cover;
        width: 97%;">
          <div class="column q-pa-md">
            <div class="q-pa-md text-white column items-center">
              <h1>
                <img src="../assets/main_title.png" alt="">
              </h1>
              <p>台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
            </div>
            <div class="q-pa-md self-center my-card" >
              <!-- <q-input bg-color="white" standout="bg-white"
              bottom-slots v-model="search" label="搜尋關鍵字">
              </q-input> -->
              <div class="q-gutter-md">
                <div class="row justify-between">
                  <q-select bg-color="white" standout="bg-white" outlined
                  v-model="selectCategory" class="col-md-6 col-12"
                  :options="category" label="類別" />
                  <q-select bg-color="white" standout="bg-white" outlined
                  v-model="selectLocation" class="col-md-6 col-12"
                  :options="location" label="選擇縣市" >
                    <template v-slot:after>
                      <q-btn padding="md" color="primary"
                      icon="search" @click="getCategoryCountry()"></q-btn>
                    </template>
                  </q-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-parallax>
    </div>
</template>
<script>
import {
  ref,
  onMounted,
  inject,
} from 'vue';
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

    const getLocalData = () => {
      axios.get('https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot').then((res) => {
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
