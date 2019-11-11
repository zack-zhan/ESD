<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">用户管理</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>用户名：</span>
          <a-input placeholder="请输入" v-model="userName" />
        </a-col>
        <a-col :span="6">
          <span>角色名称：</span>
          <a-input placeholder="请输入" v-model="roleName" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-button type="primary" @click="addUserVisible = true">＋ 添加用户</a-button>
    </div>

    <!-- 添加用户弹框组件 -->
    <a-modal
      title="添加用户"
      v-model="addUserVisible"
      @ok="addSave = !addSave"
      cancelText="取消"
      okText="保存"
      width="437px"
    >
      <AddUser :save="addSave" :visible="addUserVisible" @success="success"></AddUser>
    </a-modal>

    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="userId"
        @change="onChange"
        :pagination="{
          total: total,
          current: currentPage,
          pageSize: pageSize
        }"
      >
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

      <!-- 修改用户弹框组件 -->
      <a-modal
        title="修改用户"
        v-model="editUserVisible"
        @ok="editSave = !editSave"
        cancelText="取消"
        okText="保存"
        width="437px"
      >
        <EditUser :save="editSave" :visible="editUserVisible" :id="id" @success="success"></EditUser>
      </a-modal>
    </div>
  </div>
</template>

<script>
import AddUser from './dialogs/add-user' // 引入添加用户弹框组件
import EditUser from './dialogs/edit-user' // 引入修改用户弹框组件

import { useradminpage, useradmindelete } from '@/service/system'
export default {
  data () {
    return {
      columns: [{
        title: '用户名',
        dataIndex: 'userName'
      }, {
        title: '角色',
        dataIndex: 'roleName'
      }, {
        title: '操作人',
        dataIndex: 'operator'
      }, {
        title: '操作时间',
        dataIndex: 'operatingTime'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],

      data: [],

      addUserVisible: false,
      editUserVisible: false,
      id: '',
      addSave: false,
      editSave: false,

      userName: '',
      roleName: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    AddUser,
    EditUser
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        userName: this.userName,
        roleName: this.roleName,
        num: this.currentPage,
        size: this.pageSize
      }
      useradminpage(params)
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
      this.id = row.userId
      this.editUserVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.userId
      }
      useradmindelete(params)
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
      this.addUserVisible = false
      this.editUserVisible = false
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
</style>
