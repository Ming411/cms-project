<template>
  <div class="rose-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/echart'
import type { IDataType } from '../types'
const props = defineProps<{
  roseData: IDataType
}>()

const options = computed(() => {
  return {
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [30, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
