<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="form"
  >
    <a-form-item
      label="部门："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
    <a-select
        v-decorator="[
          'departmentId',
          {rules: [{ required: true, message: '请选择' }]}
        ]"
        placeholder="请选择"
      >
        <a-select-option v-for="(item,index) in data" :key="index" :value="item.departmentId">{{item.departmentName}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="职位："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入职位名称' }]}
        ]"
        placeholder="请输入职位名称"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import { departmentlist, positioninsert } from '@/service/staff'
export default {
  props: {
    save: {
      type: Boolean,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),

      data: []
    }
  },
  watch: {
    save (val) {
      this.handleSubmit()
    },
    visible (val) {
      this.form = this.$form.createForm(this)
      if (val) {
        this.departmentList()
      }
    }
  },
  methods: {
    // 获取部门列表
    departmentList () {
      departmentlist()
        .then(res => {
          if (res.code === 200) {
            this.data = res.body
          }
        })
    },
    // 确定
    handleSubmit (e) {
      // e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          positioninsert(values)
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
    this.departmentList()
  }
}
</script>

<style scoped>
.form >>> .ant-input{
  width: 272px;
}
.form >>> .ant-select{
  width: 272px;
}
</style>
