<template>
  <div class="dashboard">
    <div ref="divRef" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
// import echarts from 'echarts'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      const echartsInstance = echarts.init(divRef.value!)
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }

      echartsInstance.setOption(option)
    })

    return { divRef }
  }
})
</script>

<style scoped></style>
