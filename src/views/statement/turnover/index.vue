<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">进出记录</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>工号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a-input placeholder="请输入" v-model="workNo" />
        </a-col>
        <a-col :span="6">
          <span>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <a-input placeholder="请输入" v-model="employeeName" />
        </a-col>
      </a-row>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>进出位置：</span>
          <a-input placeholder="请输入" v-model="accessLocations" />
        </a-col>
        <a-col :span="6">
          <span>进出时间：</span>
          <a-locale-provider :locale="zhCN">
            <a-date-picker @change="selectDate" placeholder="选择日期" />
          </a-locale-provider>
        </a-col>
        <a-col :span="5">
          <a-button type="primary" @click="search">搜索</a-button>
          <a-button style="margin-left:5px" @click="visible = true">导出Excel</a-button>
        </a-col>
      </a-row>
    </div>

    <a-modal
      title="导出"
      v-model="visible"
      @ok="handleOk"
      cancelText="取消"
      okText="确定"
    >
      <div style="margin-left:70px;">
        <a-locale-provider :locale="zhCN">
          <a-range-picker @change="exportDate" />
        </a-locale-provider>
      </div>
    </a-modal>

    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="id"
        @change="onChange"
        :pagination="{
          total: total,
          current: currentPage,
          pageSize: pageSize
        }"
      />
    </div>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { enterlist } from '@/service/statement'

moment.locale('zh-cn')
export default {
  data () {
    return {
      zhCN,

      columns: [{
        title: '工号',
        dataIndex: 'workNo'
      }, {
        title: '姓名',
        dataIndex: 'employeeName'
      }, {
        title: '性别',
        dataIndex: 'sex'
      }, {
        title: '部门',
        dataIndex: 'department'
      }, {
        title: '进出位置',
        dataIndex: 'accessLocations'
      }, {
        title: '进出时间',
        dataIndex: 'accessDatetime'
      }, {
        title: '进出时长',
        dataIndex: 'entryTimeStr'
      }],
      data: [],

      visible: false,

      workNo: '',
      employeeName: '',
      accessLocations: '',
      accessDatetime: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,

      exportStartTime: '',
      exportEndTime: ''
    }
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        workNo: this.workNo,
        employeeName: this.employeeName,
        accessLocations: this.accessLocations,
        accessDatetime: this.accessDatetime,
        num: this.currentPage,
        size: this.pageSize
      }
      enterlist(params)
        .then(res => {
          if (res.code === 200) {
            this.data = res.body.list
            this.total = res.body.total
          }
        })
    },
    selectDate (date, dateString) {
      console.log(date, dateString)
      this.accessDatetime = dateString
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.list()
    },

    exportDate (date, dateString) {
      console.log(date, dateString)
      this.exportStartTime = dateString[0]
      this.exportEndTime = dateString[1]
    },
    // 确定导出
    handleOk () {
      const token = localStorage.getItem('token')
      window.location.href = `http://192.168.0.152:8910/report/enter/list/export?startTime=${this.exportStartTime}&endTime=${this.exportEndTime}&Authorization=${token}`
    },

    // 分页、筛选、排序
    onChange (pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
      this.currentPage = pagination.current
      this.list()
    }
  },
  mounted () {
    this.list()
  }
}
</script>

<style lang="scss" scoped>
.titlebar{
  padding: 16px 0 28px 32px;
  background: #fff;
  .title{
    font-size:20px;
    font-family:PingFangSC;
    font-weight:500;
    color:#000000;
    line-height:28px;
  }
}
.table{
  margin: 24px;
  padding: 28px 32px;
  background: #fff;
  .action{
    color: #1890FF;
  }
}
</style>

<style scoped>
.container >>> .ant-input{
  width: calc(100% - 122px);
  margin-right: 48px;
}
.container >>> .ant-calendar-picker{
  width: calc(100% - 122px);
}
.container >>> .ant-calendar-picker .ant-input{
  width: 100%;
}
</style>
