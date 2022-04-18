<template>
  <div class="paeg-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <!-- 具名插槽 -->
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="search">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 按钮重置操作
    const handleResetClick = () => {
      // formData.value = formOriginData
      for (const key in formOriginData) {
        // 不可以直接对他进行赋值操作，直接进行赋值操作会导致子组件中得浅拷贝引用对象失效
        formData.value[`${key}`] = formOriginData[key]
      }
    }
    return {
      formData,
      handleResetClick
    }
  }
})
</script>

<style scoped>
h1 {
  margin: 0;
  padding: 20px;
}
.handle-btns {
  text-align: right;
  padding: 0 50px;
}
</style>
