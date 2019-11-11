<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">操作日志</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>操作人：</span>
          <a-input placeholder="请输入" v-model="operatorName"/>
        </a-col>
        <a-col :span="9">
          <span>时间：</span>
          <a-locale-provider :locale="zhCN">
            <a-range-picker @change="timeChange" />
          </a-locale-provider>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
    </div>

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

import { loglist } from '@/service/system'

moment.locale('zh-cn')
export default {
  data () {
    return {
      zhCN,

      columns: [{
        title: '操作人',
        dataIndex: 'operatorName'
      }, {
        title: '操作时间',
        dataIndex: 'operatingDatetime'
      }, {
        title: '操作描述',
        dataIndex: 'description'
      }],

      data: [],

      operatorName: '',
      startTime: '',
      endTime: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    timeChange (date, dateString) {
      console.log(date, dateString)
      this.startTime = dateString[0]
      this.endTime = dateString[1]
    },

    // 获取列表
    list () {
      const params = {
        operatorName: this.operatorName,
        startTime: this.startTime,
        endTime: this.endTime,
        num: this.currentPage,
        size: this.pageSize
      }
      loglist(params)
        .then(res => {
          if (res.code === 200) {
            this.data = res.body.list
            this.total = res.body.total
          }
        })
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.list()
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
