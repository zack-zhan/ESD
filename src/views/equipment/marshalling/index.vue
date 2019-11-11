<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">设备编组</div>
      <a-row style="margin:28px 0;">
        <a-col :span="6">
          <span>编组名称：</span>
          <a-input placeholder="请输入" v-model="groupName" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="search">搜索</a-button>
        </a-col>
      </a-row>
      <a-button type="primary" @click="addMarshallingVisible = true">＋ 添加编组</a-button>
    </div>

    <!-- 添加编组弹框组件 -->
    <a-modal
      title="添加编组"
      v-model="addMarshallingVisible"
      @ok="addSave = !addSave"
      cancelText="取消"
      okText="保存"
      width="437px"
    >
      <AddMarshalling :save="addSave" :visible="addMarshallingVisible" @success="success"></AddMarshalling>
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
            <a href="javascript:;" @click="edit(text,record)">修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="您确定要删除吗?" @confirm="del(text,record)" okText="确定" cancelText="取消">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>

      <!-- 修改编组弹框组件 -->
      <a-modal
        title="修改编组"
        v-model="editMarshallingVisible"
        @ok="editSave = !editSave"
        cancelText="取消"
        okText="保存"
        width="437px"
      >
        <EditMarshalling :save="editSave" :visible="editMarshallingVisible" :id="id" @success="success"></EditMarshalling>
      </a-modal>
    </div>
  </div>
</template>

<script>
import AddMarshalling from './dialogs/add-marshalling' // 引入添加编组弹框组件
import EditMarshalling from './dialogs/edit-marshalling' // 引入修改编组弹框组件

import { grouplist, groupdelete } from '@/service/equipment'
export default {
  data () {
    return {
      columns: [{
        title: '编组名称',
        dataIndex: 'groupName'
      }, {
        title: '上午开始时间',
        dataIndex: 'amStartTime'
      }, {
        title: '上午结束时间',
        dataIndex: 'amEndTime'
      }, {
        title: '下午开始时间',
        dataIndex: 'pmStartTime'
      }, {
        title: '下午结束时间',
        dataIndex: 'pmEndTime'
      }, {
        title: '设备数量',
        dataIndex: 'total'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        align: 'center'
      }],
      data: [],

      addMarshallingVisible: false,
      editMarshallingVisible: false,
      id: '',
      addSave: false,
      editSave: false,

      groupName: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  components: {
    AddMarshalling,
    EditMarshalling
  },
  methods: {
    // 获取列表
    list () {
      const params = {
        groupName: this.groupName,
        num: this.currentPage,
        size: this.pageSize
      }
      grouplist(params)
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
      this.editMarshallingVisible = true
    },
    // 删除
    del (row) {
      const params = {
        id: row.id
      }
      groupdelete(params)
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
      this.addMarshallingVisible = false
      this.editMarshallingVisible = false
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
  .red{
    background:rgba(245,34,45,1);
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
</style>
