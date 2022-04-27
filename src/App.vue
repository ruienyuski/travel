<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row justify-between container q-py-md">
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
