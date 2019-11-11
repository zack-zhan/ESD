<template>
  <a-drawer
    title="修改设备"
    placement="right"
    :closable="false"
    :visible="visible"
    width="800"
  >
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-row>
        <div class="title">设备信息</div>
        <a-col :span="12">
          <a-form-item
            label="设备编号："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'code',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.code}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="设备位置："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'location',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.location}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="设备名称："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.name}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="设备IP："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'ip',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.ip}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <div class="title" style="margin-top:10px;">测试标准范围选择</div>
        <a-col :span="12">
          <a-form-item
            label="左脚电阻最大值："
            :label-col="{ span: 9 }"
            :wrapper-col="{ span: 13 }"
          >
            <a-input
              v-decorator="[
                'leftFootResistanceMax',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.leftFootResistanceMax}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="右脚电阻最大值："
            :label-col="{ span: 9 }"
            :wrapper-col="{ span: 13 }"
          >
            <a-input
              v-decorator="[
                'rightFootResistanceMax',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.rightFootResistanceMax}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="手腕带电阻最大值："
            :label-col="{ span: 10 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'wristStrapResistanceMax',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.wristStrapResistanceMax}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="设备启用："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-switch
              v-decorator="[
                'state'
              ]"
              :checked="checked"
              @change="checkedChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="左脚电阻最小值："
            :label-col="{ span: 9 }"
            :wrapper-col="{ span: 13 }"
          >
            <a-input
              v-decorator="[
                'leftFootResistanceMin',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.leftFootResistanceMin}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="右脚电阻最小值："
            :label-col="{ span: 9 }"
            :wrapper-col="{ span: 13 }"
          >
            <a-input
              v-decorator="[
                'rightFootResistanceMin',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.rightFootResistanceMin}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="手腕带电阻最小值："
            :label-col="{ span: 10 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'wristStrapResistanceMin',
                {rules: [{ required: true, message: '请输入' }],initialValue: data.wristStrapResistanceMin}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        class="fr"
        style="margin-right:30px;"
      >
        <a-button @click="cancel" style="margin-right:20px;">取消</a-button>
        <a-button
          type="primary"
          html-type="submit"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import { equipmentget, equipmentupdate } from '@/service/equipment'
export default {
  props: {
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

      data: [],
      checked: false
    }
  },
  watch: {
    visible (val) {
      this.form = this.$form.createForm(this)
      if (val) {
        this.list()
      }
    }
  },
  methods: {
    // 获取详情
    list () {
      const params = {
        id: this.id
      }
      equipmentget(params)
        .then(res => {
          if (res.code === 200) {
            this.data = res.body
            console.log(this.data, '--')
            if (this.data.state === 'DISABLE') {
              this.checked = true
            } else {
              this.checked = false
            }
          }
        })
    },
    checkedChange (checked) {
      this.checked = checked
    },

    // 保存
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let state = values.state
          if (state || state === 'DISABLE') {
            state = 'DISABLE'
          } else {
            state = 'ENABLE'
          }
          const params = {
            code: values.code,
            id: this.id,
            ip: values.ip,
            leftFootResistanceMax: values.leftFootResistanceMax,
            leftFootResistanceMin: values.leftFootResistanceMin,
            location: values.location,
            name: values.name,
            rightFootResistanceMax: values.rightFootResistanceMax,
            rightFootResistanceMin: values.rightFootResistanceMin,
            wristStrapResistanceMax: values.wristStrapResistanceMax,
            wristStrapResistanceMin: values.wristStrapResistanceMin,
            state: state
          }
          equipmentupdate(params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功')
                this.$emit('success')
              }
            })
        }
      })
    },
    // 取消
    cancel () {
      this.$emit('close')
      this.form = this.$form.createForm(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(0,0,0,0.65);
  line-height:22px;
  margin-left: 16px;
  margin-bottom: 24px;
}
</style>
