import { request } from '../http'

export function fetchPalettesList(params: {
  page: number
  pageSize: number
  name: string
}) {
  return request.Get<Service.ResponseResult<Entity.PalettesList>>('/palettes/list', { params })
}

export function createPalettes(data: Entity.Palettes) {
  return request.Post<Service.ResponseResult<Entity.Palettes>>('/palettes/create', data)
}

export function updatePalettes(data: Entity.Palettes) {
  return request.Post<Service.ResponseResult<Entity.Palettes>>('/palettes/update', data)
}

export function deletePalettes(id: number) {
  return request.Post<Service.ResponseResult<Entity.Palettes>>(`/palettes/delete/${id}`)
}

