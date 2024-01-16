<template>
  <div class="search">
    <el-input 
      v-model="text"
      @input="search()"
      class="w-50 m-2"
      placeholder="Search your lists"
      :prefix-icon="Search"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useDataStore } from "@/stores/data";
const {searching} = useDataStore()

const text = ref("");

const search = () => {
  searching(text.value)
}

</script>

<style lang="scss">
.search {
  max-width: 400px;
  margin: auto;
  padding-top: 30px;
  .el-input__wrapper {
    background-color: rgba(255, 255, 255, 0.156);
    .el-input__inner {
      color: #fff;
      &::placeholder {
        color: #fff;
      }
    }
    .el-input__icon {
      color: #fff;
    }
  }
}
</style>
