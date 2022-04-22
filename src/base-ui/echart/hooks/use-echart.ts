import * as echarts from 'echarts'

// json需要声明一下，默认是不识别的
import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const resizeObserver = new ResizeObserver(() => {
    echartInstance.resize()
  })
  resizeObserver.observe(el)

  // 或者
  const updateResize = () => {
    // 暴露给外界，当侧栏缩放时，进行重新绘制
    echartInstance.resize()
  }
  // window.addEventListener('resize', () => {
  //   echartInstance.resize()
  // })

  const setOptions = (options: echarts.EChartsOption) => {
    // 渲染图形
    echartInstance.setOption(options)
  }

  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
