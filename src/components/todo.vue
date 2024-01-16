<template>
  <!-- dialog -->
  <dialogTask />
  <!-- dialog -->

  <div class="todo">
    <div class="container">
      <div class="todo-top">
        <navbar />
      </div>
      <div class="todo-search">
        <search />
      </div>
      <div class="todo-today">
        <todayTasks />
      </div>
      <div class="todo-tasks">
        <task />
      </div>
      <div class="add-task__button" @click="openDialog()">
        <div class="add-task">
          <i class="bx bx-plus-circle"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from "@/components/todoComp/navbar.vue";
import search from "@/components/todoComp/search.vue";
import todayTasks from "@/components/todoComp/todayTasks.vue";
import task from "@/components/todoComp/task.vue";

import dialogTask from "@/components/dialog/dialogTask.vue";

import { useDialogStore } from "@/stores/dialog";
const { setDialogToggle } = useDialogStore();

const openDialog = () => {
  setDialogToggle(true);
};


</script>

<style lang="scss">
@import url("@/assets/styles/todo.scss");
</style>
