import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Index from '@/layouts/index'

import DepartmentM from '@/views/staff/department/index' // 员工信息-部门管理
import Position from '@/views/staff/position/index' // 员工信息-部门管理
import Personnel from '@/views/staff/personnel/index' // 员工信息-人工档案
import JurisdictionS from '@/views/staff/jurisdiction/index' // 员工信息-权限设置

import Message from '@/views/equipment/message/index' // 设备管理-设备信息
import Marshalling from '@/views/equipment/marshalling/index' // 设备管理-设备编组

import Turnover from '@/views/statement/turnover/index' // 报表管理-进出记录
import Qualified from '@/views/statement/qualified/index' // 报表管理-合格记录
import Examine from '@/views/statement/examine/index' // 报表管理-点检记录
import Analyze from '@/views/statement/analyze/index' // 报表管理-分析统计
import DepartmentR from '@/views/statement/department/index' // 报表管理-部门记录

import User from '@/views/system/user/index' // 系统设置-用户管理
import jurisdictionM from '@/views/system/jurisdiction/index' // 系统设置-权限管理
import Journal from '@/views/system/journal/index' // 系统设置-操作日志

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: { path: 'department_m' },
      children: [
        { path: 'department_m', name: 'DepartmentM', component: DepartmentM },
        { path: 'position', name: 'Position', component: Position },
        { path: 'personnel', name: 'Personnel', component: Personnel },
        { path: 'jurisdiction_s', name: 'JurisdictionS', component: JurisdictionS },

        { path: 'message', name: 'Message', component: Message },
        { path: 'marshalling', name: 'Marshalling', component: Marshalling },

        { path: 'turnover', name: 'Turnover', component: Turnover },
        { path: 'qualified', name: 'Qualified', component: Qualified },
        { path: 'examine', name: 'Examine', component: Examine },
        { path: 'analyze', name: 'Analyze', component: Analyze },
        { path: 'department_r', name: 'DepartmentR', component: DepartmentR },

        { path: 'user', name: 'User', component: User },
        { path: 'jurisdiction_m', name: 'jurisdictionM', component: jurisdictionM },
        { path: 'journal', name: 'Journal', component: Journal }
      ]
    }
  ]
})
