<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">设备信息</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>设备名称：</span>
          <a-input placeholder="请输入" v-model="name" />
        </a-col>
        <a-col :span="6">
          <span>设备IP：</span>
          <a-input placeholder="请输入" v-model="ip" />
        </a-col>
        <a-col :span="6">
          <span>状态：</span>
          <a-select v-model="status">
            <a-select-option value="">请选择</a-select-option>
            <a-select-option value="0">在线</a-select-option>
            <a-select-option value="1">离线</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-button type="primary" @click="addEquipmentVisible = true">＋ 添加设备</a-button>
    </div>

    <!-- 添加设备弹框组件 -->
    <AddEquipment :visible="addEquipmentVisible" @success="success" @close="addEquipmentVisible = false"></AddEquipment>

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
      >
        <template slot="state" slot-scope="text">
          <div>
            <i class="circle" :class="text.statusStr === '离线'?'gray':'blue'" />
            <span>&nbsp;&nbsp;{{text.statusStr}}</span>
          </div>
        </template>
        <template slot="action" slot-scope="text,record">
          <div class="action">
            <a href="javascript:;" @click="edit(text,record,)">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="您确定要删除吗?" @confirm="del(text,record)" okText="确定" cancelText="取消">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>

      <!-- 修改设备弹框组件 -->
    <EditEquipment :visible="editEquipmentVisible" :id="id" @success="success" @close="editEquipmentVisible = false"></EditEquipment>
    </div>
  </div>
</template>

<script>
import AddEquipment from './dialogs/add-equipment' // 引入添加设备弹框组件
import EditEquipment from './dialogs/edit-equipment' // 引入修改设备弹框组件

import { equipmentlist, equipmentdelete } from '@/service/equipment'
export default {
  data () {
    return {
      columns: [{
        title: '名称',
        dataIndex: 'name'
      }, {
        title: '设备IP',
        dataIndex: 'ip'
      }, {
        title: '位置',
        dataIndex: 'location'
      }, {
        title: '状态',
        scopedSlots: { customRender: 'state' }
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],
      data: [],

      addEquipmentVisible: false,
      editEquipmentVisible: false,
      id: 0,

      name: '',
      ip: '',
      status: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    AddEquipment,
    EditEquipment
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        name: this.name,
        ip: this.ip,
        status: this.status,
        num: this.currentPage,
        size: this.pageSize
      }
      equipmentlist(params)
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

    // 修改
    edit (row) {
      this.id = row.id
      this.editEquipmentVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.id
      }
      equipmentdelete(params)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.list()
          }
        })
    },

    // 分页、筛选、排序
    onChange (pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
      this.currentPage = pagination.current
      this.list()
    },
    // 成功操作
    success () {
      this.list()
      this.addEquipmentVisible = false
      this.editEquipmentVisible = false
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
  .circle{
    display: inline-block;
    width:6px;
    height:6px;
    background:rgba(0,0,0,0.25);
    border-radius: 100%;
    position: relative;
    top: -2px;
  }
  .gray{
    background:rgba(0,0,0,0.25);
  }
  .blue{
    background:rgba(24,144,255,1);
  }
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
.container >>> .ant-select{
  width: calc(100% - 122px);
  margin-right: 48px;
}
</style>
