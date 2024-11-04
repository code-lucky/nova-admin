import { request } from '../http'

export function fetchClientList(params: {
  page: number
  pageSize: number
  name: string
  openid: string
}) {
  return request.Get<Service.ResponseResult<Entity.ClientList>>('/client/list', { params })
}
