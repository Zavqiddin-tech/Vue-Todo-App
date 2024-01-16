<template>
  <el-row class="nav justify-between align-center">
    <div class="nav-title">Hey, Todo</div>
    <div class="nav-avatar"><i class="bx bx-user"></i></div>
  </el-row>
  <el-row class="nav-date">
    <span class="day">{{ day }}</span>
    <span class="month">{{ monthArray[month] }}</span>
    <span class="year">{{ year }}</span>
    <div class="time">
      <span class="hours"
        >{{ `${hours >= 10 ? hours : `0${hours}`}` }}:{{
          `${minutes >= 10 ? minutes : `0${minutes}`}`
        }}</span
      >
    </div>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { monthItems } from "@/stores/month";
const { monthArray } = storeToRefs(monthItems());
const year = ref();
const month = ref();
const day = ref();
const hours = ref();
const minutes = ref();

year.value = new Date().getFullYear();
month.value = new Date().getMonth();
day.value = new Date().getDate();
hours.value = new Date().getHours();
minutes.value = new Date().getMinutes();
setInterval(() => {
  hours.value = new Date().getHours();
  minutes.value = new Date().getMinutes();
}, 1000);
</script>

<style lang="scss">
.nav {
  &-title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  &-avatar {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.344);
    i {
      font-size: 25px;
    }
  }
  &-date {
    padding-top: 15px;
    .day {
      padding-right: 10px;
    }
    .month {
      padding-right: 10px;
    }
    .time {
      padding-left: 30px;
    }
  }
}
</style>
@/stores/months.js../../stores/month
