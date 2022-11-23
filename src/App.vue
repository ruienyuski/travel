<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 平板 -->
    <div class="container q-py-md desktop-hide">
      <div class="row justify-center">
        <router-link to="/">
        <img src="./assets/logo_desktop.png" alt="logo"
        style="height: 57px; max-width: 99px">
        </router-link>
      </div>
      <div class="row justify-center">
        <q-item to="/" exact>
          <q-item-section >台灣景點</q-item-section>
        </q-item>
        <q-item  to="/hotel" exact>
          <q-item-section >美食住宿</q-item-section>
        </q-item>
        <q-item  to="/traffic" exact>
          <q-item-section >景點交通</q-item-section>
        </q-item>
      </div>
    </div>
    <!-- 桌面 -->
    <div class="desktop-only row justify-between container q-py-md">
      <router-link  to="/">
      <img src="./assets/logo_desktop.png" alt="logo"
      style="height: 57px; max-width: 99px">
      </router-link>
      <div class="row">
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">▲</q-avatar>
          </q-item-section>
          <q-item-section class="text-primary">台灣景點</q-item-section>
        </q-item>
        <q-item  to="/hotel" exact>
          <q-item-section avatar>
            <q-avatar color="secondary" text-color="white" font-size="18px" icon="square" />
          </q-item-section>
          <q-item-section class="text-secondary">美食住宿</q-item-section>
        </q-item>
          <q-item  to="/traffic" exact>
            <q-item-section avatar>
              <q-avatar color="accent" text-color="white" font-size="18px" icon="circle" />
            </q-item-section>
            <q-item-section class="text-accent">景點交通</q-item-section>
          </q-item>
      </div>

    </div>
    <router-view></router-view>
  </q-layout>
</template>
<script>
import { onMounted, inject } from 'vue';
import qs from 'qs';

export default {

  setup() {
    const axios = inject('axios'); // inject axios
    const getAuthorizationHeader = () => {
      const parameter = {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_ID,
        client_secret: process.env.VUE_APP_APIKEY,
      };

      // eslint-disable-next-line camelcase
      const auth_url = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
      axios({
        method: 'POST',
        url: auth_url,
        dataType: 'JSON',
        data: qs.stringify(parameter),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
        });
    };
    onMounted(() => {
      getAuthorizationHeader();
    });
  },
};
</script>
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
    z-index:1;
  }
  .drop-shadow:before, .drop-shadow:after {
    -webkit-box-shadow: 0 15px 10px rgba(0,0,0, .6);
    -moz-box-shadow: 0 15px 10px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 10px rgba(0, 0, 0, 0.6);
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
    -o-transform: rotate(-5deg);
    position: absolute;
    left: 10px;
    bottom: 13px;
    z-index: -1;
    width: 45%;
    max-width: 300px;
    height: 20%;
    content: "";
  }

  .drop-shadow::after {
    transform: rotate(5deg);
    right: 10px;
    left: auto;
  };
</style>
