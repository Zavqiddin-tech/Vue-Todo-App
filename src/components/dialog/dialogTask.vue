<template>
  <el-dialog
    v-model="dialogToggle"
    title="Tips"
    width="100%"
    :before-close="handleClose"
  >
    <el-form ref="ruleFormRef" :model="task" :rules="rules" label-position="top">
      <el-form-item label="Task name" prop="name">
        <el-input v-model="task.name" />
      </el-form-item>
      <el-row class="input-time">
        <el-col :span="10">
          <el-form-item label="start time" prop="startTime">
            <el-time-select
              v-model="task.startTime"
              start="01:00"
              step="00:15"
              end="23:55"
              placeholder="Select time"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="end time" prop="endTime">
            <el-time-select
              v-model="task.endTime"
              start="01:00"
              step="00:15"
              end="23:55"
              placeholder="Select time"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="subtask-wrapper">
        <div class="subtask-top">
          <el-button round type="success" @click="onSubtask()"
            >+ Subtasks</el-button
          >
        </div>
        <div class="subtask-main" v-if="task.subtasks[0]">
          <el-form-item
            label="subtask name"
            prop="subtask"
            v-for="item in task.subtasks"
          >
            <el-input v-model="item.name" />
          </el-form-item>
        </div>
      </div>
      <div class="btn-group">
        <el-button @click="handleClose">cancel</el-button>
        <el-button type="primary" @click="add(ruleFormRef)">submit</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import { useDialogStore } from "@/stores/dialog";
import { useDataStore } from "@/stores/data";
const { dialogToggle, editToggle } = storeToRefs(useDialogStore());
const { setDialogToggle, setEditToggle } = useDialogStore();
const { tempo } = storeToRefs(useDataStore());
const { setData, editSetData, freeObj } = useDataStore();

const handleClose = () => {
  setDialogToggle(false);
  setEditToggle(false);
  task.value = {
    _id: crypto.randomUUID(),
    check: false,
    subtasks: [],
  };
  freeObj();
};
const task = ref({
  _id: crypto.randomUUID(),
  check: false,
  subtasks: [],
});

const ruleFormRef = ref();
const rules = {
  name: [
    { required: true, message: "Do not leave a space", trigger: "blur" },
    { min: 3, message: "Length should be", trigger: "blur" },
  ],
  startTime: [
    { required: true, message: "Do not leave a space", trigger: "blur" },
  ],
  endTime: [
    { required: true, message: "Do not leave a space", trigger: "blur" },
  ],
};

const onSubtask = () => {
  task.value.subtasks.push({ _id: crypto.randomUUID(), check: false });
};
watch(editToggle, () => {
  if (editToggle.value) {
    setDialogToggle(true);
    task.value = tempo.value;
  }
});
const add = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (editToggle.value) {
        console.log("slaom");
        editSetData(task.value);
        handleClose();
      } else {
        setData(task.value);
        handleClose();
      }
      ElNotification({
        title: "Success",
        message: "information added",
        type: "success",
      });
    } else {
      ElNotification({
        title: "Warning",
        message: "data is not fully entered",
        type: "warning",
      });
    }
  });
};
</script>

<style lang="scss">
.el-overlay-dialog {
  max-width: 700px;
  margin: auto;
  padding: 0 5px;
}
.btn-group {
  text-align: right;
}
.input-time {
  justify-content: space-between;
}
.subtask-wrapper {
  padding-top: 15px;
  padding-bottom: 20px;
}
.subtask-main {
  padding-top: 20px;
}
</style>
