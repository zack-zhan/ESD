<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">权限管理</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>角色名：</span>
          <a-input placeholder="请输入" v-model="name" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-button type="primary" @click="addRoleVisible = true">＋ 添加角色</a-button>
    </div>

    <!-- 添加角色弹框组件 -->
    <a-modal
      title="添加角色"
      v-model="addRoleVisible"
      @ok="addSave = !addSave"
      cancelText="取消"
      okText="保存"
      width="437px"
    >
      <AddRole :save="addSave" :visible="addRoleVisible" @success="success"></AddRole>
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

      <!-- 修改角色弹框组件 -->
      <a-modal
        title="修改角色"
        v-model="editRoleVisible"
        @ok="editSave = !editSave"
        cancelText="取消"
        okText="保存"
        width="437px"
      >
        <EditRole :save="editSave" :visible="editRoleVisible" :id="id" @success="success"></EditRole>
      </a-modal>
    </div>
  </div>
</template>

<script>
import AddRole from './dialogs/add-role' // 引入添加角色弹框组件
import EditRole from './dialogs/edit-role' // 引入添加角色弹框组件

import { rolelist, roledelete } from '@/service/system'
export default {
  data () {
    return {
      columns: [{
        title: '角色名',
        dataIndex: 'name'
      }, {
        title: '创建人',
        dataIndex: 'creator'
      }, {
        title: '修改人',
        dataIndex: 'updator'
      }, {
        title: '操作时间',
        dataIndex: 'updateDate'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],
      data: [],

      addRoleVisible: false,
      editRoleVisible: false,
      id: '',
      addSave: false,
      editSave: false,

      name: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    AddRole,
    EditRole
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        name: this.name,
        num: this.currentPage,
        size: this.pageSize
      }
      rolelist(params)
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
      this.editRoleVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.id
      }
      roledelete(params)
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
      this.addRoleVisible = false
      this.editRoleVisible = false
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
