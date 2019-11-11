<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="form"
  >
    <a-form-item
      label="姓名："
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入' }, { pattern: '^[\u4e00-\u9fa5_a-zA-Z]+$', message: '只能输入中英文'},{max:30, message: '不能超过30个字符'}],initialValue: data.name}
        ]"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      label="登录账号："
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'loginName',
          {rules: [{ required: true, message: '请输入' }, { pattern: '^[\u4e00-\u9fa5_a-zA-Z]+$', message: '只能输入中英文'},{max:30, message: '不能超过30个字符'}],initialValue: data.userName}
        ]"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item
      label="登录密码："
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'loginPwd',
          {rules: [{ required: true, message: '请输入' }, { pattern: '^[_a-zA-Z0-9]+$', message: '只能输入英文字母、数字和下划线'},{min:5,max:30, message: '请输入5-30个字符'}],initialValue: data.loginPwd}
        ]"
        placeholder="请输入"
        :type="type"
      >
        <a-icon
          slot="suffix"
          :type="icon"
          @click="switchType"
        />
      </a-input>
    </a-form-item>
    <a-form-item
      label="选择角色："
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-select
        v-decorator="[
          'roleId',
          {rules: [{ required: true, message: '请选择' }],initialValue: data.roleId}
        ]"
        placeholder="请选择"
      >
        <a-select-option v-for="item in roleData" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
import { roleall, useradmingetone, useradminupdate } from '@/service/system'
import Utils from '@/utils/utils'
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

      icon: 'eye',
      type: 'text',

      data: [],
      roleData: []
    }
  },
  watch: {
    save (val) {
      this.handleSubmit()
    },
    visible (val) {
      this.form = this.$form.createForm(this)
      if (val) {
        this.roleData = []
        this.list()
        this.roleList()
      }
    }
  },
  methods: {
    // 获取详情
    list () {
      const params = {
        id: this.id
      }
      useradmingetone(params)
        .then(res => {
          if (res.code === 200) {
            this.data = res.body
            this.data.loginPwd = Utils.decrypt(res.body.loginPwd)
          }
        })
    },
    // 获取角色列表
    roleList () {
      roleall()
        .then(res => {
          if (res.code === 200) {
            this.roleData = res.body
          }
        })
    },

    switchType () {
      if (this.icon === 'eye') {
        this.icon = 'eye-invisible'
        this.type = 'password'
      } else {
        this.icon = 'eye'
        this.type = 'text'
      }
    },

    // 确定
    handleSubmit (e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const params = {
            id: this.id,
            name: values.name,
            loginName: values.loginName,
            loginPwd: Utils.encrypt(values.loginPwd),
            roleId: values.roleId
          }
          useradminupdate(params)
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
    this.roleList()
  }
}
</script>

<style scoped>
.form >>> .ant-input-affix-wrapper{
  margin-right: 30px;
}
.form >>> .ant-input-suffix{
  right: -40px;
  cursor: pointer;
}
.form >>> .ant-input,.ant-select{
  width: 244px;
}
.form >>> .ant-form-explain{
  width: 244px;
}
</style>
