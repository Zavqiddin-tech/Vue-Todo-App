<template>
  <div class="today">
    <div class="today-title">Today's tasks</div>

    <el-progress
      v-if="data.length >= 1"
      type="circle"
      :percentage="Math.floor((doneData.length / data.length) * 100)"
    />

    <el-progress v-else type="circle" :percentage="0" />

    <div class="add-task" @click="openDialog()">
      <i class="bx bx-plus-circle"></i>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDialogStore } from "@/stores/dialog";
import { useDataStore } from "@/stores/data";
const { setDialogToggle } = useDialogStore();
const { data, doneData } = storeToRefs(useDataStore());

const openDialog = () => {
  setDialogToggle(true);
};
</script>

<style lang="scss">
.today {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-title {
    font-size: 20px;
    font-weight: 500;
  }
  .el-progress {
    .el-progress-circle {
      width: 50px !important;
      height: 50px !important;
    }
  }
  .el-progress__text {
    color: #fff;
  }
}
</style>
