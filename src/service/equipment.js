import { get, post, put, del } from '@/utils/api'

// 分页查询设备
export const equipmentlist = (params) => get('/equipment/list', params)
// 新增设备
export const equipmentinsert = (params) => post('/equipment/insert', params)
// 新增设备
export const equipmentget = (params) => get('/equipment/get', params)
// 修改设备
export const equipmentupdate = (params) => put('/equipment/update', params)
// 删除设备
export const equipmentdelete = (params) => del('/equipment/delete', params)

// 设备分组分页查询
export const grouplist = (params) => get('/equipment/group/list', params)
// 查询全部未分组的设备
export const getEquipmentWithOutGroup = (params) => get('/equipment/getEquipmentWithOutGroup', params)
// 添加设备分组
export const groupinsert = (params) => post('/equipment/group/insert', params)
// 查询分组详情
export const groupget = (params) => get('/equipment/group/get', params)
// 修改设备分组
export const groupupdate = (params) => put('/equipment/group/update', params)
// 删除设备分组
export const groupdelete = (params) => del('/equipment/group/delete', params)
