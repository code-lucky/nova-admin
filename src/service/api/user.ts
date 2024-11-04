import { request } from '../http'
import type { Entity } from '@/typings/entities/user'

export function fetchUserList(params: {
  page: number
  pageSize: number
}) {
  return request.Get<Service.ResponseResult<Entity.UserList>>('/user/list', { params })
}

