<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">人员档案</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>姓名：</span>
          <a-input placeholder="请输入" v-model="staffName" />
        </a-col>
        <a-col :span="6">
          <span>部门：</span>
          <a-input placeholder="请输入" v-model="departmentName" />
        </a-col>
        <a-col :span="6">
          <span>职位：</span>
          <a-input placeholder="请输入" v-model="positionName" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <div class="btn">
        <a-button type="primary" @click="addPersonnelVisible = true">＋ 添加人员</a-button>
        <a-button @click="download">导出</a-button>
        <a-upload
          :showUploadList="false"
          :headers="headers"
          action='http://192.168.0.152:8910/personnel/importPersonnelInfo'
          @change="handleChange">
          <a-button>导入</a-button>
        </a-upload>
      </div>
    </div>

    <!-- 添加人员弹框组件 -->
    <AddPersonnel :visible="addPersonnelVisible" @close='addPersonnelVisible = false' @success="success"></AddPersonnel>

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

      <!-- 修改人员弹框组件 -->
      <EditPersonnel :visible="editPersonnelVisible" :id="id" @close='editPersonnelVisible = false' @success="success"></EditPersonnel>
    </div>
  </div>
</template>

<script>
import AddPersonnel from './dialogs/add-personnel' // 引入添加人员弹框组件
import EditPersonnel from './dialogs/edit-personnel' // 引入修改人员弹框组件

import { personnelpage, personneldelete } from '@/service/staff'
export default {
  data () {
    return {
      columns: [{
        title: '姓名',
        dataIndex: 'staffName'
      }, {
        title: '部门',
        dataIndex: 'departmentName'
      }, {
        title: '职位',
        dataIndex: 'positionName'
      }, {
        title: '修改时间',
        dataIndex: 'updateDate'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],
      data: [],
      headers: {
        Authorization: ''
      },

      addPersonnelVisible: false,
      editPersonnelVisible: false,
      id: 0,

      staffName: '',
      departmentName: '',
      positionName: '',
      currentPage: 1,
      pageSize: 10,
      total: 30
    }
  },
  components: {
    AddPersonnel,
    EditPersonnel
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        staffName: this.staffName,
        departmentName: this.departmentName,
        positionName: this.positionName,
        num: this.currentPage,
        size: this.pageSize
      }
      personnelpage(params)
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
    // 导出
    download () {
      const token = localStorage.getItem('token')
      window.location.href = `http://192.168.0.152:8910/personnel/exportPersonnelInfo?Authorization=${token}`
    },
    handleChange (info) {
      if (info.file.status === 'done') {
        if (info.file.response.code === 200) {
          this.$message.success('导入成功')
        } else {
          this.$message.error(info.file.response.message)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败`)
      }
    },

    // 修改
    edit (row) {
      this.id = row.id
      this.editPersonnelVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.id
      }
      personneldelete(params)
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
      this.addPersonnelVisible = false
      this.editPersonnelVisible = false
      this.list()
    }
  },
  mounted () {
    this.list()
    this.headers.Authorization = localStorage.getItem('token')
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
.btn >>> .ant-btn{
  margin-right: 5px;
}
</style>
