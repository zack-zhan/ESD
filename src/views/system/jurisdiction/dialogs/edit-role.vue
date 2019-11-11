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
          {rules: [{ required: true, message: '请输入' }],initialValue: name}
        ]"
        placeholder="请输入"
      />
    </a-form-item>
    <a-checkbox-group @change="checkChange" style="margin-left:10px;" :value="checkedValues">
      <a-checkbox v-for="(item,index) in menuData" :key="index" :value="item">{{item.name}}</a-checkbox>
    </a-checkbox-group>
  </a-form>
</template>

<script>
import { menulist, roleget, roleupdate } from '@/service/system'
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

      name: '',
      data: [],
      menuData: [],
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
      roleget(params)
        .then(res => {
          if (res.code === 200) {
            this.name = res.body.name
            this.data = res.body.menuList
            this.menuList()
          }
        })
    },
    // 获取菜单列表
    menuList () {
      menulist()
        .then(res => {
          if (res.code === 200) {
            this.menuData = res.body
            this.checkedValues = this.menuData.filter(x => this.data.findIndex(y => x.id === y.id) !== -1)
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
          const params = {
            id: this.id,
            name: values.name,
            menuList: this.checkedValues
          }
          console.log(params, '---')
          roleupdate(params)
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
