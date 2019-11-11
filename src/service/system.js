import { get, post, put, del } from '@/utils/api'

// 系统用户分页列表
export const useradminpage = (params) => get('/useradmin/page', params)
// 新增系统用户
export const useradmininsert = (params) => post('/useradmin/insert', params)
// 系统用户详情
export const useradmingetone = (params) => get('/useradmin/getone', params)
// 更新系统用户
export const useradminupdate = (params) => put('/useradmin/update', params)
// 删除系统用户
export const useradmindelete = (params) => del('/useradmin/delete', params)

// 角色列表
export const rolelist = (params) => get('/systm/role/list', params)
// 全部角色列表
export const roleall = (params) => get('/systm/role/all', params)
// 查询模块
export const menulist = (params) => get('/system/menu/list', params)
// 添加角色
export const roleinsert = (params) => post('/systm/role/insert', params)
// 查询角色
export const roleget = (params) => get('/systm/role/get', params)
// 修改角色
export const roleupdate = (params) => put('/systm/role/update', params)
// 删除角色
export const roledelete = (params) => del('/systm/role/delete', params)

// 分页查询系统日志
export const loglist = (params) => get('/system/operation/log/list', params)
