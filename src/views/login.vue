<template>
  <div>
    <div class="left">
      <img src="@/assets/images/login_bg.png" alt="">
    </div>
    <div class="right">
      <div class="login">
        <div class="title">
          <p>ESD系统管理平台</p>
          <p>账户密码登录</p>
        </div>
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: '请输入用户' }] }
              ]"
              placeholder="用户"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }] }
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              style="width:100%"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/service/login'
import Utils from '@/utils/utils'
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          values.password = Utils.encrypt(values.password)
          const params = values

          login(params)
            .then(res => {
              if (res.code === 200) {
                localStorage.setItem('token', res.body)
                localStorage.setItem('name', values.userName)
                this.$router.push('/')
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left{
  width: 65%;
  height: 100vh;
  float: left;
  img{
    width: 100%;
    height: 100%;
  }
}
.right{
  width: 35%;
  float: right;
  .login{
    width: 368px;
    margin: 162px auto;
    .title{
      p:nth-child(1){
        font-size:33px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:33px;
        margin-bottom: 32px;
      }
      p:nth-child(2){
        font-size:16px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(0,0,0,0.85);
        line-height:24px;
        margin-bottom: 34px;
      }
    }
  }
}
</style>

<style scoped>
.login >>> .ant-input{
  height: 40px;
  line-height: 40px;
}
.login >>> .ant-btn-primary{
  height: 40px;
  line-height: 40px;
}
</style>
