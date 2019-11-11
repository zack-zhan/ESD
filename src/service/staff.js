import { get, post, put, del } from '@/utils/api'

// 部门分页列表
export const departmentpage = (params) => get('/department/page', params)
// 部门列表
export const departmentlist = (params) => get('/department/list', params)
// 新增部门
export const departmentinsert = (params) => post('/department/insert', params)
// 部门详情
export const departmentgetone = (params) => get('/department/getone', params)
// 更新部门
export const departmentupdate = (params) => put('/department/update', params)
// 删除部门
export const departmentdelete = (params) => del('/department/delete', params)

// 职位分页列表
export const positionpage = (params) => get('/position/page', params)
// 职位列表
export const positionlist = (params) => get('/position/list', params)
// 根据部门ID查询职位列表
export const listByDeparmentId = (params) => get('/position/listByDeparmentId', params)
// 新增职位
export const positioninsert = (params) => post('/position/insert', params)
// 职位详情
export const positiongetone = (params) => get('/position/getone', params)
// 更新职位
export const positionupdate = (params) => put('/position/update', params)
// 删除职位
export const positiondelete = (params) => del('/position/delete', params)

// 人员档案分页列表
export const personnelpage = (params) => get('/personnel/page', params)
// 新增人员档案
export const personnelinsert = (params) => post('/personnel/insert', params)
// 人员档案详情
export const personnelgetone = (params) => get('/personnel/getone', params)
// 更新人员档案
export const personnelupdate = (params) => put('/personnel/update', params)
// 删除人员档案
export const personneldelete = (params) => del('/personnel/delete', params)

export const importPersonnelInfo = (params) => post('/personnel/importPersonnelInfo', params)

// 权限检测人员分页列表
export const checkpage = (params) => get('/person/check/page', params)
// 权限详情
export const checkget = (params) => get('/person/check/get', params)
// 权限设置
export const checkupdate = (params) => put('/person/check/update', params)
// 权限下发
export const checkpublish = (params) => get('/person/check/publish', params)
