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
