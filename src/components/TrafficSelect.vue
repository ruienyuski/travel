<template>
  <Loading :active="isLoading" />
  <div class="q-pb-none q-mb-none q-gutter-md drop-shadow">
      <div class="q-px-md q-pt-md q-pb-none q-mb-none ">
        <div class="q-gutter-md row justify-center">
            <q-select bg-color="white" standout="bg-white" outlined
            v-model="selectCity" class="col-md-3"
            :options="cityData" label="選擇縣市" emit-value map-options
            @update:model-value="getLocalData()"
            />
            <q-select bg-color="white" standout="bg-white" outlined
            v-model="selectRoute" class="col-md-3"
            :options="routeData" label="選擇路線" >
              <template v-slot:after>
                <q-btn padding="md" color="primary"
                icon="search" @click.prevent="getRoute()"></q-btn>
              </template>
            </q-select>
        </div>
        <div class="q-px-md q-pt-md q-pb-none">
          <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
            <q-tabs
              v-model="tab"
              no-caps
              indicator-color="primary"
              align="justify"
              @click.stop="getTab()"
            >
              <q-tab name="go">
                <span class="">往
                <span class="text-primary">{{direction.go}}</span>
                </span>
              </q-tab>
              <q-tab name="back">
                <span class="">往
                  <span class="text-primary">{{direction.back}}</span>
                </span>
              </q-tab>
            </q-tabs>
          </div>
        </div>
      </div>
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
import emitter from '../methods/mitt';
// import { useRouter } from 'vue-router';

export default {
  name: 'LayoutDefault',
  setup() {
    const axios = inject('axios');// inject axios
    // const router = useRouter();
    const selectCity = ref('Taipei');
    const selectRoute = ref(null);
    const Route = ref([]);
    const routeData = ref(null);
    const tab = ref('');
    const direction = ref({});
    const runBus = ref({});
    const isLoading = ref(null);
    // quasar select 顯示物件內容的屬性名稱要用 label
    const cityData = [
      { label: '臺北市', value: 'Taipei' },
      { label: '新北市', value: 'NewTaipei' },
      { label: '桃園市', value: 'Taoyuan' },
      { label: '臺中市', value: 'Taichung' },
      { label: '臺南市', value: 'Tainan' },
      { label: '高雄市', value: 'Kaohsiung' },
      { label: '基隆市', value: 'Keelung' },
      { label: '新竹市', value: 'Hsinchu' },
      { label: '新竹縣', value: 'HsinchuCounty' },
      { label: '苗栗縣', value: 'MiaoliCounty' },
      { label: '彰化縣', value: 'ChanghuaCounty' },
      { label: '南投縣', value: 'NantouCounty' },
      { label: '雲林縣', value: 'YunlinCounty' },
      { label: '嘉義縣', value: 'ChiayiCounty' },
      { label: '嘉義市', value: 'Chiayi' },
      { label: '屏東縣', value: 'PingtungCounty' },
      { label: '宜蘭縣', value: 'YilanCounty' },
      { label: '花蓮縣', value: 'HualienCounty' },
      { label: '臺東縣', value: 'TaitungCounty' },
      { label: '金門縣', value: 'KinmenCounty' },
      { label: '澎湖縣', value: 'PenghuCounty' },
      { label: '連江縣', value: 'LienchiangCounty' },
    ];
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
    const getLocalData = () => {
      isLoading.value = true;
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${selectCity.value}`,
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        routeData.value = [];
        selectRoute.value = '';
        direction.value = {};
        emitter.emit('direction', {});
        const { data } = res;
        const tempRoute = [];
        data.forEach((el) => {
          tempRoute.push({ id: el.RouteID, name: el.RouteName.Zh_tw });
        });
        const toStr = new Set(tempRoute.map((item) => JSON.stringify(item)));
        const toAry = [...toStr];
        Route.value = toAry.map((item) => JSON.parse(item));
        const sortData = [];
        Route.value.forEach((el) => {
          sortData.push(el.name);
        });
        routeData.value = sortData.sort();
        isLoading.value = false;
      });
    };
    const upateRoute = () => {
      axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${selectCity.value}/${selectRoute.value}`,
        {
          headers: getAuthorizationHeader(),
        }).then((res) => {
        const temp = [];
        const cacheData = {};
        const goData = [];
        const backData = [];
        res.data.forEach((el) => {
          if (el.RouteName.Zh_tw === selectRoute.value) {
            if (el.StopStatus === 0) {
              temp.push(el);
            }
          }
        });
        // eslint-disable-next-line
        console.log('temp', temp);
        cacheData.go = temp.filter((el) => el.Direction);
        cacheData.back = temp.filter((el) => !el.Direction);
        cacheData.go.forEach((el) => {
          goData.push({
            plateNumb: el.PlateNumb || '', // 有車牌的就顯示，反之則留空
            stops: [
              {
                estimateTime: el.EstimateTime, // 到站時間預估(秒)
                stopUID: el.StopUID, // 站牌唯一識別代碼
              },
            ],
          });
        });
        runBus.value = {};
        cacheData.back.forEach((el) => {
          backData.push({
            plateNumb: el.PlateNumb || '', // 有車牌的就顯示，反之則留空
            stops: [
              {
                estimateTime: el.EstimateTime, // 到站時間預估(秒)
                stopUID: el.StopUID, // 站牌唯一識別代碼
              },
            ],
          });
        });
        runBus.value = {
          goData,
          backData,
        };
        emitter.emit('runBus', runBus.value);
      });
    };
    const StopOfRoute = () => {
      axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${selectCity.value}/${selectRoute.value}
        `,
        {
          headers: getAuthorizationHeader(),
        },
      ).then((res) => {
        res.data.forEach((el) => {
          if (el.RouteName.Zh_tw === selectRoute.value) {
            if (el.Direction === 0) {
              direction.value.back_direction = el.Stops;
            } else {
              direction.value.go_direction = el.Stops;
            }
          }
        });
        emitter.emit('direction', direction.value);
        tab.value = 'go';
        upateRoute();
        emitter.emit('tab', 'go');
      });
    };
    const getRoute = () => {
      axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${selectCity.value}/${selectRoute.value}
        `,
        {
          headers: getAuthorizationHeader(),
        },
      ).then((res) => {
        const select = res.data.filter((el) => el.RouteName.Zh_tw === selectRoute.value);
        direction.value.go = select[0].DepartureStopNameZh;
        direction.value.back = select[0].DestinationStopNameZh;
        StopOfRoute();
      });
    };
    const getTab = () => {
      emitter.emit('tab', tab.value);
      upateRoute();
    };
    onMounted(() => {
      getLocalData();
    });
    watch(selectRoute, (newIndex) => {
      if (newIndex !== '') {
        emitter.on('reStart', (e) => {
          if (e) {
            getTab();
          }
        });
      }
    });

    return {
      Route,
      selectCity,
      selectRoute,
      cityData,
      getLocalData,
      getRoute,
      routeData,
      tab,
      direction,
      getTab,
      upateRoute,
      runBus,
      isLoading,
    };
  },
};
</script>
