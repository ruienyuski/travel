<template>
    <TrafficSelect />
    <q-page-container>
      <div class="container"  style="width:800px; max-width:100%;"
      v-if="stopData.length === 0">無資料</div>
      <div v-else class="container" style="width:800px; max-width:100%;">
        <div class=" q-pa-md text-right text-primary">{{timer}} 秒後自動更新</div>
        <!-- 原先 router-view -->
        <div class="row ">
          <div class="col-md-6 q-pa-md text-no-wrap"
          v-for="item in stopData" :key="item.StopUID">
            <q-btn v-if="item.timeText === '進站中'"
            color="primary" class="btn-fixed-width"
            :label="item.timeText"></q-btn>
            <q-btn v-else-if="item.timeText" class="btn-fixed-width" outline
            :label="item.timeText"></q-btn>
            <q-btn v-else outline class="btn-fixed-width"  label="--"></q-btn>
            <span class="q-px-md ">{{item.StopName.Zh_tw}}</span>
          </div>
        </div>
      </div>
      <div class="row q-pa-md justify-center">
        Taiwan Tourguide  © Code: Michael  /  Design: KT
      </div>
    </q-page-container>

</template>
<style lang="scss">
  .btn-fixed-width {
    width: 143px;
    height: 44px;
  }
</style>
<script>
import {
  ref,
  watch,
} from 'vue';
import emitter from '../methods/mitt';
import TrafficSelect from '../components/TrafficSelect.vue';

export default {
  components: { TrafficSelect },
  setup() {
    const stop = ref({});
    const tab = ref('');
    const stopData = ref({});
    const runBusData = ref({});
    const timer = ref(60);
    const id = ref('');
    const filterData = () => {
      // // eslint-disable-next-line
      // console.log(stop.value);
      if (tab.value === 'go') {
        if (stop.value.go_direction) {
          stopData.value = stop.value.go_direction;
        } else {
          stopData.value = [];
        }
      } else if (tab.value === 'back') {
        if (stop.value.back_direction) {
          stopData.value = stop.value.back_direction;
        } else {
          stopData.value = [];
        }
      }
    };
    const filterRunBusData = () => {
      let time = 0;
      let tempData = [];
      if (tab.value === 'go') {
        tempData = runBusData.value.goData;
      } else {
        tempData = runBusData.value.backData;
      }
      tempData.forEach((el) => {
        stopData.value.map((dir) => {
          if (el.stops[0].stopUID === dir.StopUID) {
            time = Math.floor(el.stops[0].estimateTime / 60);
            // 文字顯示
            if (time === 0) {
              dir.timeText = '進站中';
            } else {
              dir.timeText = `${time} 分鐘`;
            }
          }
          return dir;
        });
      });
    };
    const Count = () => {
      timer.value = 60;
      id.value = setInterval(() => {
        if (timer.value === 0) {
          timer.value = 60;
          emitter.emit('reStart', true);
        }
        timer.value -= 1;
        return timer.value;
      }, 1000);
    };
    emitter.on('direction', (e) => {
      stopData.value = {};
      stop.value = e;
    });
    emitter.on('tab', (e) => {
      tab.value = e;
      filterData();
    });
    emitter.on('runBus', (e) => {
      runBusData.value = e;
      filterRunBusData();
    });
    watch(tab, (newIndex, oldIndex) => {
      if (newIndex !== oldIndex) {
        clearInterval(id.value);
        Count();
      }
    });

    return {
      stop,
      tab,
      stopData,
      filterData,
      runBusData,
      Count,
      timer,
      id,
    };
  },
};
</script>
