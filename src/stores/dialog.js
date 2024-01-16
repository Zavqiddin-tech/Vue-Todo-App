import { ref } from "vue";
import { defineStore } from "pinia";

export const useDialogStore = defineStore("toggle", () => {
  const dialogToggle = ref(false);
  const setDialogToggle = (val) => (dialogToggle.value = val);



  const editToggle = ref(false)
  const setEditToggle = (val) => editToggle.value = val


  const toggle = ref(false) 
  const setToggle = (val)=> toggle.value = val

  return {
    dialogToggle,
    editToggle,
    toggle,
    setDialogToggle,
    setEditToggle,
    setToggle
  };
});
