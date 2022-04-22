<template>
  <div class="base-echart">
    <div :style="{ width: width, height: height }" ref="echartDivRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/use-echart'
// 定义props
const props = withDefaults(
  defineProps<{ width?: string; height?: string; options: EChartsOption }>(),
  {
    width: '100%',
    height: '370px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    // 数据改变表格需要重新渲染
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
