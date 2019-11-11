import { post } from '@/utils/api'

// 登录
export const login = (params) => post('/authenticaion/login', params)
