<template>
  <a-drawer
    title="添加人员"
    placement="right"
    :closable="false"
    :visible="visible"
    width="800"
  >
    <a-form
      :form="form"
      @submit="handleSubmit"
      class="form"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="姓名："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="生日："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-date-picker
              v-decorator="[
                'birthday',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
              @change="selectBirthday"
              placeholder="请选择" />
          </a-form-item>
          <a-form-item
            label="工号："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'workNo',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="民族："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'ethnic',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="性别："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-radio-group
              v-decorator="[
                'sex',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
            >
              <a-radio :value="1">男</a-radio>
              <a-radio :value="2">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-upload
            style="margin-left: 15px;"
            :showUploadList="false"
            :headers="headers"
            action="http://192.168.0.152:8910/file/upload"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img class="img" v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div class="avatar" v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传照片</div>
            </div>
            <div class="hint">只支持.jpg 格式</div>
          </a-upload>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="部门："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-select
              v-decorator="[
                'departmentId',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
              placeholder="请选择"
              @change="selectDepartment"
            >
              <a-select-option v-for="(item,index) in departmentData" :key="index" :value="item.departmentId">{{item.departmentName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="电话："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'telephone',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="身份证号："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'identityCard',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="有效日期："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-date-picker
              v-decorator="[
                'validDate',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
              @change="selectValid"
              placeholder="请选择" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="职位："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-select
              v-decorator="[
                'positionId',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
              placeholder="请选择"
            >
              <a-select-option v-for="(item,index) in positionData" :key="index" :value="item.positionId">{{item.positionName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="邮箱："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'email',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="登记日期："
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-date-picker
              v-decorator="[
                'registrationDate',
                {rules: [{ required: true, message: '请选择' }]}
              ]"
              @change="selectRegister"
              placeholder="请选择" />
          </a-form-item>
          <a-form-item
            label="卡号："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input
              v-decorator="[
                'cardNo',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="证件地址："
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 20 }"

          >
            <a-textarea
              class="textarea"
              v-decorator="[
                'identityAddress',
                {rules: [{ required: true, message: '请输入' }]}
              ]"
              placeholder="请输入" :autosize="{ minRows: 3, maxRows: 3 }"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="备注1："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
            style="margin-left:12px;"
          >
            <a-input
              v-decorator="[
                'memo1'
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="备注3："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
            style="margin-left:12px;"
          >
            <a-input
              v-decorator="[
                'memo3'
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="备注2："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
            style="margin-left:12px;"
          >
            <a-input
              v-decorator="[
                'memo2'
              ]"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="备注4："
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
            style="margin-left:12px;"
          >
            <a-input
              v-decorator="[
                'memo4'
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
import { departmentlist, listByDeparmentId, personnelinsert } from '@/service/staff'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),

      departmentData: [],
      positionData: [],

      loading: false,
      imageUrl: '',

      birthday: '',
      register: '',
      valid: '',
      img: '',

      headers: {
        Authorization: ''
      }
    }
  },
  watch: {
    visible (val) {
      this.imageUrl = ''
      this.form = this.$form.createForm(this)
      if (val) {
        this.headers.Authorization = localStorage.getItem('token')
        this.departmentList()
        // this.positionList()
      }
    }
  },
  methods: {
    selectBirthday (date, dateString) {
      console.log(date, dateString)
      this.birthday = dateString
    },
    selectRegister (date, dateString) {
      console.log(date, dateString)
      this.register = dateString
    },
    selectValid (date, dateString) {
      console.log(date, dateString)
      this.valid = dateString
    },

    // 获取部门列表
    departmentList () {
      departmentlist()
        .then(res => {
          if (res.code === 200) {
            this.departmentData = res.body
          }
        })
    },
    // 获取职位列表
    selectDepartment (value) {
      console.log(`selected ${value}`)
      const params = {
        departmentId: value
      }
      listByDeparmentId(params)
        .then(res => {
          if (res.code === 200) {
            this.positionData = res.body
          }
        })
    },

    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.img = info.file.response.body.url
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          console.log(this.imageUrl, '--')
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('您只能上传JPG文件!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图像必须小于2MB!')
      }
      return isJPG && isLt2M
    },

    // 保存
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const params = values
          params.birthday = this.birthday
          params.registrationDate = this.register
          params.validDate = this.valid
          params.icon = this.img
          console.log(params, '---')
          personnelinsert(params)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.hint{
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(0,0,0,0.45);
  line-height:22px;
}
.textarea{
  line-height: 2.2;
}
</style>

<style scoped>
.form >>> .ant-calendar-picker{
  width: 100%;
}
</style>

<style>
.avatar{
  display: inline-block;
  width: 104px;
  height: 104px;
  text-align: center;
  border: 1px dashed #ccc;
  padding-top: 24px;
  cursor: pointer;
}
.avatar i {
  font-size: 24px;
  color: #999;
  margin-bottom: 15px;
}
.img{
  width: 104px;
  height: 104px;
  cursor: pointer;
}
</style>
