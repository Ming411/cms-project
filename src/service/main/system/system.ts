import hyRequest from '@/service'
import type { IDataType } from '@/service/types'
export function getPageListData(url: string, queyrInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queyrInfo
  })
}

//  url:   /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}

// 新增用户接口
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 编辑用户
export function editPageData(url: string, editwData: any) {
  return hyRequest.patch<IDataType>({
    url,
    data: editwData
  })
}
