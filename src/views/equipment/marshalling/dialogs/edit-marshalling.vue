<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="form"
  >
    <a-form-item
      label="编组名称："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-input
        v-decorator="[
          'groupName',
          {rules: [{ required: true, message: '请输入' }],initialValue: data.groupName}
        ]"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      label="上午开始时间："
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-time-picker
      v-decorator="[
          'amStartTime',
          {rules: [{ required: true, message: '请选择' }],initialValue: data.amStartTime}
        ]"
        placeholder="选择时间"
        @change="onChange1"
        :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')"
      />
    </a-form-item>
    <a-form-item
      label="上午结束时间："
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-time-picker
        v-decorator="[
          'amEndTime',
          {rules: [{ required: true, message: '请选择' }],initialValue: data.amEndTime}
        ]"
        placeholder="选择时间"
        @change="onChange2"
        :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')"
      />
    </a-form-item>
    <a-form-item
      label="下午开始时间："
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-time-picker
        v-decorator="[
          'pmStartTime',
          {rules: [{ required: true, message: '请选择' }],initialValue: data.pmStartTime}
        ]"
        placeholder="选择时间"
        @change="onChange3"
        :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')"
      />
    </a-form-item>
    <a-form-item
      label="下午结束时间："
      :label-col="{ span: 7 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-time-picker
        v-decorator="[
          'pmEndTime',
          {rules: [{ required: true, message: '请选择' }],initialValue: data.pmEndTime}
        ]"
        placeholder="选择时间"
        @change="onChange4"
        :defaultOpenValue="moment('00:00:00', 'HH:mm:ss')"
      />
    </a-form-item>
    <a-form-item
      label="添加设备："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
        <div class="box">
          <div class="title">
            <a-checkbox
              :indeterminate="indeterminate"
              @change="onCheckAllChange"
              :checked="checkAll"
            />
          </div>
          <div class="content">
            <a-checkbox-group @change="checkChange" :value="checkedValues">
              <div class="line" v-for="(item,index) in groupData" :key="index">
                <a-checkbox :value="item">{{item.name}}</a-checkbox>
              </div>
            </a-checkbox-group>
          </div>
        </div>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from 'moment'

import { groupget, getEquipmentWithOutGroup, groupupdate } from '@/service/equipment'
export default {
  props: {
    save: {
      type: Boolean,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),

      moment,
      amStartTime: '',
      amEndTime: '',
      pmStartTime: '',
      pmEndTime: '',

      data: [],
      groupData: [],
      indeterminate: false,
      checkAll: false,
      checkedValues: []
    }
  },
  watch: {
    save (val) {
      this.handleSubmit()
    },
    visible (val) {
      this.form = this.$form.createForm(this)
      if (val) {
        this.indeterminate = false
        this.checkedValues = []
        this.list()
        this.groupList()
      }
    },

    checkedValues (val) {
      if (val.length > 0) {
        this.indeterminate = true
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
      if (val.length === this.groupData.length) {
        this.indeterminate = false
        this.checkAll = true
      }
    },
    checkAll (val) {
      if (val) {
        this.checkedValues = this.groupData
      } else {
        this.checkedValues = []
      }
    }
  },
  methods: {
    // 获取详情
    list () {
      const params = {
        id: this.id
      }
      groupget(params)
        .then(res => {
          if (res.code === 200) {
            this.amStartTime = res.body.amStartTime
            this.amEndTime = res.body.amEndTime
            this.pmStartTime = res.body.pmStartTime
            this.pmEndTime = res.body.pmEndTime

            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const dateStr = year + '-' + month + '-' + day + ' '
            const amStartTime = dateStr + res.body.amStartTime
            const amEndTime = dateStr + res.body.amEndTime
            const pmStartTime = dateStr + res.body.pmStartTime
            const pmEndTime = dateStr + res.body.pmEndTime

            this.data = res.body
            this.data.amStartTime = moment(new Date(amStartTime))
            this.data.amEndTime = moment(new Date(amEndTime))
            this.data.pmStartTime = moment(new Date(pmStartTime))
            this.data.pmEndTime = moment(new Date(pmEndTime))
          }
        })
    },

    onChange1 (time, timeString) {
      console.log(time, timeString)
      this.amStartTime = timeString
    },
    onChange2 (time, timeString) {
      this.amEndTime = timeString
    },
    onChange3 (time, timeString) {
      this.pmStartTime = timeString
    },
    onChange4 (time, timeString) {
      this.pmEndTime = timeString
    },

    // 获取分组列表
    groupList () {
      const params = {
        groupId: this.id
      }
      getEquipmentWithOutGroup(params)
        .then(res => {
          if (res.code === 200) {
            this.groupData = res.body
            this.groupData.map(item => {
              if (item.checked === 1) {
                this.checkedValues.push(item)
              }
            })
          }
        })
    },
    onCheckAllChange (e) {
      this.indeterminate = false
      this.checkAll = e.target.checked
    },
    checkChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.checkedValues = checkedValues
    },

    // 确定
    handleSubmit (e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const params = {
            id: this.id,
            groupName: values.groupName,
            amStartTime: this.amStartTime,
            amEndTime: this.amEndTime,
            pmStartTime: this.pmStartTime,
            pmEndTime: this.pmEndTime,
            equipmentList: this.checkedValues
          }
          groupupdate(params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功')
                this.$emit('success')
              }
            })
        }
      })
    }
  },
  mounted () {
    this.list()
    this.groupList()
  }
}
</script>

<style lang="scss" scoped>
.form{
  margin-left: 20px;
  .box{
    width:245px;
    height:232px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(217,217,217,1);
    overflow-x: hidden;
    overflow-y:auto;
    .title{
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid rgba(0,0,0,0.09);
      padding-left: 11px;
    }
    .line{
      width: 243px;
      height: 32px;
      line-height: 32px;
      padding-left: 11px;
      overflow: hidden;/*超出部分隐藏*/
      text-overflow:ellipsis;/* 超出部分显示省略号 */
      white-space: nowrap;/*规定段落中的文本不进行换行 */
    }
    .line:hover{
      background:rgba(230,247,255,1);
    }
  }
}
</style>

<style scoped>
.form >>> .ant-input{
  width: 244px;
}
</style>
