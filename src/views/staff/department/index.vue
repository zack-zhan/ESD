<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">部门管理</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>部门：</span>
          <a-input placeholder="请输入" v-model="departmentName" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-button type="primary" @click="addDepartmentVisible = true">＋ 添加部门</a-button>
    </div>

    <!-- 添加部门弹框组件 -->
    <a-modal
      title="添加部门"
      v-model="addDepartmentVisible"
      @ok="addSave = !addSave"
      okText="保存"
      cancelText="取消"
      width="437px"
    >
      <AddDepartment :save="addSave" :visible="addDepartmentVisible" @success="success"></AddDepartment>
    </a-modal>

    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="departmentId"
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

      <!-- 修改部门弹框组件 -->
      <a-modal
        title="修改部门"
        v-model="editDepartmentVisible"
        @ok="editSave = !editSave"
        cancelText="取消"
        okText="保存"
        width="437px"
      >
        <EditDepartment :save="editSave" :id="id" :visible="editDepartmentVisible" @success="success"></EditDepartment>
      </a-modal>
    </div>
  </div>
</template>

<script>
import AddDepartment from './dialogs/add-department' // 引入添加部门弹框组件
import EditDepartment from './dialogs/edit-department' // 引入修改部门弹框组件

import { departmentpage, departmentdelete } from '@/service/staff'
export default {
  data () {
    return {
      columns: [{
        title: '部门',
        dataIndex: 'departmentName'
      }, {
        title: '上级部门',
        dataIndex: 'parentName'
      }, {
        title: '修改时间',
        dataIndex: 'updateDate'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],

      data: [],

      addDepartmentVisible: false,
      editDepartmentVisible: false,
      id: '',
      addSave: false,
      editSave: false,

      departmentName: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    AddDepartment,
    EditDepartment
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        departmentName: this.departmentName,
        num: this.currentPage,
        size: this.pageSize
      }
      departmentpage(params)
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
      console.log(row)
      this.id = row.departmentId
      this.editDepartmentVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.departmentId
      }
      departmentdelete(params)
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
      this.pageSize = pagination.pageSize
      this.list()
    },
    // 成功操作
    success () {
      this.addDepartmentVisible = false
      this.editDepartmentVisible = false
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
  width: calc(100% - 94px);
  margin-right: 48px;
}
</style>
