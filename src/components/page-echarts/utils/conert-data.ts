import { coordinateData } from './coordinate-data'
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
    // 最终格式[{name:'上海',value:[经度，纬度，数据值]},{},...]
  }
  return res
}
