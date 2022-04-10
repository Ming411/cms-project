<template>
  <h2>{{ $store.state.name }}</h2>
  <router-link to="/login">登录</router-link>
  <router-link to="/main">首页</router-link>
  <router-view />
  <el-button type="primary">Primary</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {}
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
