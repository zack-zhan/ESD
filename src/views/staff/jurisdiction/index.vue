<template>
  <div class="container">
    <div class="titlebar">
      <div class="title">权限设置</div>
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
        <a-button @click="setJurisdictionVisible = true">设置权限</a-button>
        <a-button @click="issued">权限下发</a-button>
      </div>
    </div>

    <!-- 设置权限弹框组件 -->
    <a-modal
      title="设置权限"
      v-model="setJurisdictionVisible"
      @ok="setJurisdiction"
      cancelText="取消"
      okText="保存"
      width="437px"
    >
      <a-checkbox-group @change="checkChange" :disabled="checked" :value="checkedValues">
        <a-checkbox value="handCheck">手腕带检测</a-checkbox>
        <a-checkbox value="leftFootCheck">左脚检测</a-checkbox>
        <a-checkbox value="rightFootCheck">右脚检测</a-checkbox>
      </a-checkbox-group>
      <br>
      <br>
      <br>
      免检&nbsp;&nbsp;<a-switch @change='switchChange' :checked="checked"/>
    </a-modal>

    <div class="table">
      <div class="select">
        <a-icon type="info-circle" class="color" /> 已选择
        <span class="color"> {{selectedRowKeys.length}} </span>项&nbsp;&nbsp;&nbsp;&nbsp;总计：<span>{{total}} </span>人&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:;" class="color" @click="selectedRowKeys = []">清空</a>
      </div>
      <a-table
        :columns="columns"
        :dataSource="data"
        rowKey="id"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        @change="onChange"
        :pagination="{
          total: total,
          current: currentPage,
          pageSize: pageSize
        }"
      >
        <template slot="action" slot-scope="text,record">
          <div class="action">
            <a href="javascript:;" @click="set(text,record,)">设置权限</a>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { checkpage, checkget, checkupdate, checkpublish } from '@/service/staff'
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
      selectedRowKeys: [],

      setJurisdictionVisible: false,
      checkedValues: [],
      checked: false,
      personnelIds: [],

      staffName: '',
      departmentName: '',
      positionName: '',
      currentPage: 1,
      pageSize: 10,
      total: 30
    }
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
      checkpage(params)
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

    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.personnelIds = selectedRowKeys
    },

    // 权限下发
    issued () {
      checkpublish()
        .then(res => {
          if (res.code === 200) {
            this.$message.success('设置成功')
          }
        })
    },

    // 设置权限
    set (row) {
      this.personnelIds = []
      this.setJurisdictionVisible = true
      this.personnelIds.push(row.id)

      const params = {
        id: row.id
      }
      checkget(params)
        .then(res => {
          if (res.code === 200) {
            if (res.body.needCheck === 1) {
              this.checked = true
              this.checkedValues = []
            } else {
              this.checked = false
              this.checkedValues = []
              if (res.body.handCheck === 1) {
                this.checkedValues.push('handCheck')
              }
              if (res.body.leftFootCheck === 1) {
                this.checkedValues.push('leftFootCheck')
              }
              if (res.body.rightFootCheck === 1) {
                this.checkedValues.push('rightFootCheck')
              }
            }
          }
        })
    },
    checkChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.checkedValues = checkedValues
    },
    switchChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.checked = checked
    },
    // 保存设置权限
    setJurisdiction () {
      if (this.personnelIds.length > 0) {
        let params = {
          personnelIds: this.personnelIds,
          needCheck: 0,
          handCheck: 0,
          leftFootCheck: 0,
          rightFootCheck: 0
        }
        if (this.checked) {
          params.needCheck = 1
        } else {
          params.needCheck = 0
          this.checkedValues.map(item => {
            if (item === 'handCheck') {
              params.handCheck = 1
            }
            if (item === 'leftFootCheck') {
              params.leftFootCheck = 1
            }
            if (item === 'rightFootCheck') {
              params.rightFootCheck = 1
            }
          })
        }
        console.log(params, '--')
        checkupdate(params)
          .then(res => {
            if (res.code === 200) {
              this.$message.success('设置成功')
              this.setJurisdictionVisible = false

              this.selectedRowKeys = []
              this.checkedValues = []
              this.personnelIds = []
              this.list()
            }
          })
      } else {
        this.$message.error('设置失败，您未选择员工')
      }
    },

    // 分页、筛选、排序
    onChange (pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
      this.currentPage = pagination.current
      this.pageSize = pagination.pageSize
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
  .select{
    height:40px;
    line-height: 40px;
    padding-left: 16px;
    background:rgba(230,247,255,1);
    border-radius:4px;
    border:1px solid rgba(186,231,255,1);
    margin-bottom: 16px;
    .color{
      color:#1890FF;
    }
  }
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
.btn >>> .ant-btn-primary{
  margin-right: 5px;
}
</style>
