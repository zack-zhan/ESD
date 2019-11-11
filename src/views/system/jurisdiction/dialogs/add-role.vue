<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="form"
  >
    <a-form-item
      label="角色名称："
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入' }]}
        ]"
        placeholder="请输入"
      />
    </a-form-item>
    <a-checkbox-group @change="checkChange" style="margin-left:10px;" :value="checkedValues">
      <a-checkbox v-for="(item,index) in data" :key="index" :value="item">{{item.name}}</a-checkbox>
    </a-checkbox-group>
  </a-form>
</template>

<script>
import { menulist, roleinsert } from '@/service/system'
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

      data: [],
      checkedValues: []
    }
  },
  watch: {
    save (val) {
      this.handleSubmit()
    },
    visible (val) {
      this.form = this.$form.createForm(this)
      this.checkedValues = []
      if (val) {
        this.menuList()
      }
    }
  },
  methods: {
    // 获取菜单列表
    menuList () {
      menulist()
        .then(res => {
          if (res.code === 200) {
            this.data = res.body
          }
        })
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
          let params = {
            name: values.name,
            menuList: this.checkedValues
          }
          roleinsert(params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功')
                this.$emit('success')
                params = {}
              }
            })
        }
      })
    }
  },
  mounted () {
    this.menuList()
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

.form >>> .ant-checkbox-wrapper{
  margin: 0 50px 10px 0;
}
</style>
