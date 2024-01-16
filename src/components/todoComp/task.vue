<template>
  <div class="task" v-if="searchData[0]" v-for="oneData of searchData">
    <div class="task-top">
      <div :class="`${oneData.check ? 'task-title done' : 'task-title'}`">
        {{ oneData.name }}
      </div>
      <el-dropdown>
        <i class="bx bx-dots-horizontal-rounded"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editTask(oneData._id)"
              ><i class="bx bx-edit-alt"></i> edit</el-dropdown-item
            >
            <el-dropdown-item @click="deleteTask(oneData._id)"
              ><i class="bx bx-trash-alt"></i> delete</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="task-head">
      <div class="task-additional">
        <i class="bx bx-menu-alt-left"></i>
      </div>
      <div class="task-time">
        <i class="bx bx-timer"></i>
        <span class="line-column">|</span>
        <span class="start-time"
          >{{ oneData.startTime }} - {{ oneData.endTime }}</span
        >
      </div>
      <div class="task-check big" @click="checkTask(oneData._id)">
        <i v-if="oneData.check" class='bx bx-check'></i>
      </div>
    </div>
    <div class="task-bottom open">
      <div class="add-tasks" @click="editTask(oneData._id)">
        <i class="bx bx-plus"></i> add subtask
      </div>
      <div class="subtasks">
        <div
          class="subtask"
          v-if="oneData.subtasks"
          v-for="item in oneData.subtasks"
        >
          <div v-if="item.name" class="task-check small" @click="checkSubtask(item._id)">
            <i v-if="item.check" class='bx bx-check' ></i>
          </div>
          <i v-if="item.name" class="bx bx-trash-alt" @click="deleteSubtask(oneData._id, item._id)"></i>
          <div :class="`${item.check ? 'subtask-text done' : 'subtask-text'}`">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useDialogStore } from "@/stores/dialog";
const {toggle} = storeToRefs(useDialogStore());
const {setEditToggle, setToggle} = useDialogStore();
import { useDataStore } from "@/stores/data";
const { searchData } = storeToRefs(useDataStore());
const { setData, checkedTask, checkedSubtask, setTempo, delData, delSubtask } = useDataStore();

const checkTask = (id) => {
  checkedTask(id);
};
const checkSubtask = (id) => {
  checkedSubtask(id);
};

const editTask = (id) => {
  setTempo(id)
  setEditToggle(true)
};
const deleteTask = (id) => {
  if(confirm('Delete❗')) {
    delData(id)
  }
}
const deleteSubtask = (oneId, id) => {
  delSubtask(oneId, id)
}



onMounted(() => {
  if (localStorage.getItem("tasks")) {
    setData();
  }
});
</script>

<style lang="scss">
.task {
  overflow: hidden;
  padding: 10px;
  border: 2px solid #ffffffa8;
  border-radius: 10px;
  &-check {
    border: 1px solid #fff;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.big {
      width: 25px;
      height: 25px;
      font-size: 22px;
    }
    &.small {
      width: 18px;
      height: 18px;
      margin-top: 5px;
      font-size: 18px;
    }
  }
  &-title {
    &.done {
      text-decoration: line-through;
    }
  }
  &-time {
    display: flex;
    align-items: center;
    i {
      font-size: 22px;
    }
    .line-column {
      padding: 0px 10px;
    }
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-size: 30px;
      color: #ffffff;
      transition: 0.25s;
      cursor: pointer;
      &:focus-visible {
        border: unset;
        outline: unset;
      }
      &:hover {
        color: rgba(255, 255, 255, 0.488);
      }
    }
  }
  &-head {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-checkbox.el-checkbox--large .el-checkbox__inner {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: unset;
      border-radius: 5px;
      border: 2px solid #ffffff86;
      &::after {
        height: 13px;
        top: 5px;
        left: 10px;
        border-width: 3px;
      }
    }
  }
  &-additional {
    i {
      font-size: 30px;
      transform: rotate(180deg);
      color: #fff;
      transition: 0.2s;
    }
    &:hover {
      i {
        color: rgb(95, 182, 248);
      }
    }
    cursor: pointer;
  }
  &-bottom {
    max-height: 0;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    &.open {
      max-height: 600px;
      overflow: auto;
    }
    .subtask {
      margin-left: 50px;
      display: flex;
      align-items: center;
      gap: 10px;
      i {
        transition: 0.2s;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      &-text {
        &.done {
          text-decoration: line-through;
        }
      }
      .el-checkbox.el-checkbox--large .el-checkbox__inner {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: unset;
        border-radius: 5px;
        border: 2px solid #ffffff86;
        &::after {
          height: 8px;
          top: 2px;
          left: 6px;
          border-width: 2px;
        }
      }
    }
    .add-tasks {
      width: 100px;
      margin-left: 40px;
      margin-bottom: 5px;
      font-size: 12px;
      padding: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.19);
      border-radius: 10px;
      transition: 0.2s;
      &:hover {
        background-color: #ffffff55;
      }
    }
  }
}
</style>
