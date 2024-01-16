import { ref } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const data = ref([]);
  const searchData = ref([]);
  const doneData = ref([]);
  const setData = (val) => {
    if (localStorage.getItem("tasks")) {
      if (val) {
        data.value = JSON.parse(localStorage.getItem("tasks"));
        data.value = [...data.value, val];
        searchData.value = [...data.value];
        localStorage.setItem("tasks", JSON.stringify(data.value));
        doneData.value = data.value.filter((item) => item.check == true);
      } else {
        data.value = JSON.parse(localStorage.getItem("tasks"));
        searchData.value = [...data.value];
        doneData.value = data.value.filter((item) => item.check == true);
      }
    } else {
      data.value = [...data.value, val];
      searchData.value = [...data.value];
      doneData.value = data.value.filter((item) => item.check == true);
      localStorage.setItem("tasks", JSON.stringify(data.value));
    }
  };
  const editSetData = (val) => {
    data.value = data.value.map((item) => {
      if (item._id == val._id) {
        return val;
      } else {
        return item;
      }
    });
    searchData.value = [...data.value];
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };
  const delData = (id) => {
    data.value = data.value.filter((item) => item._id != id);
    searchData.value = [...data.value];
    doneData.value = data.value.filter((item) => item.check == true);
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };
  const delSubtask = (oneId, id) => {
    data.value = data.value.map((item) => {
      if (item._id == oneId) {
        item.subtasks = item.subtasks.filter((e) => e._id != id);
        return { ...item, subtasks: item.subtasks };
      } else {
        return item;
      }
    });
    searchData.value = [...data.value];
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };

  const checkedTask = (id) => {
    data.value = data.value.map((item) => {
      if (item._id == id) {
        return { ...item, check: !item.check };
      } else {
        return item;
      }
    });
    searchData.value = [...data.value];
    doneData.value = data.value.filter((item) => item.check == true);
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };
  const checkedSubtask = (id) => {
    data.value.forEach((item) => {
      item.subtasks = item.subtasks.map((e) => {
        if (e._id == id) {
          return { ...e, check: !e.check };
        } else {
          return e;
        }
      });
    });
    searchData.value = [...data.value];
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };
  const freeObj = () => {
    data.value = data.value.map((item) => {
      return (item = {
        ...item,
        subtasks: item.subtasks.filter((e) => e.name),
      });
    });
    searchData.value = [...data.value];
    localStorage.setItem("tasks", JSON.stringify(data.value));
  };
  const searching = (val) => {
    let filteredData = data.value.filter((item) => {
      if (item.name.toLowerCase().indexOf(val) !== -1) {
        return item;
      }
    });
    searchData.value = [...filteredData];
  };

  const tempo = ref({});
  const setTempo = (id) => {
    data.value.forEach((item) => {
      if (item._id == id) {
        tempo.value = item;
        return false;
      }
    });
  };

  return {
    data,
    searchData,
    doneData,
    tempo,
    setData,
    editSetData,
    delData,
    delSubtask,
    setTempo,
    checkedTask,
    checkedSubtask,
    freeObj,
    searching,
  };
});
