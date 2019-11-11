import { get } from '@/utils/api'

// 进出记录列表
export const enterlist = (params) => get('/report/enter/list', params)
// 合格记录列表
export const qualificationlist = (params) => get('/report/qualification/list', params)
// 点检记录列表
export const checklist = (params) => get('/report/check/list', params)
// 分析统计列表
export const statisticslist = (params) => get('/report/statistics/list', params)
// 部门记录列表
export const departlist = (params) => get('/report/depart/list', params)
