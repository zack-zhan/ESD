<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      width = "256"
      v-model="collapsed"
      :multiple="false"
    >
      <div class="logo">
        ESD系统管理平台
      </div>
      <a-menu theme="dark" mode="inline" :openKeys="openKeys" @openChange="onOpenChange">
        <a-sub-menu v-for="item in menu" :key="item.title">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{item.title}}</span>
          </span>
          <a-menu-item v-for="children in item.children" :key="children.name">
            <router-link :to="children.path">
              <span>&nbsp;{{children.name}}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div class="user" v-if="name">
          <img src="@/assets/images/用户.png" alt="">{{name}}，<span @click="quit">退出</span>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ background: '#F0F2F5' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,

      menu: [
        {
          icon: 'team',
          title: '员工信息',
          children: [
            {name: '部门管理', path: '/department_m'},
            {name: '职位管理', path: '/position'},
            {name: '人员档案', path: '/personnel'},
            {name: '权限设置', path: '/jurisdiction_s'}
          ]
        },
        {
          icon: 'tool',
          title: '设备管理',
          children: [
            {name: '设备信息', path: '/message'},
            {name: '设备编组', path: '/marshalling'}
          ]
        },
        {
          icon: 'profile',
          title: '报表管理',
          children: [
            {name: '进出记录', path: '/turnover'},
            {name: '合格记录', path: '/qualified'},
            {name: '点检记录', path: '/examine'},
            {name: '分析统计', path: '/analyze'},
            {name: '部门记录', path: '/department_r'}
          ]
        },
        {
          icon: 'setting',
          title: '系统设置',
          children: [
            {name: '用户管理', path: '/user'},
            {name: '权限管理', path: '/jurisdiction_m'},
            {name: '操作日志', path: '/journal'}
          ]
        }
      ],

      rootSubmenuKeys: ['员工信息', '设备管理', '报表管理', '系统设置'],
      openKeys: [],

      name: ''
    }
  },
  methods: {
    // 只展开当前父级菜单
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },

    // 退出
    quit () {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.name = localStorage.getItem('name')
  }
}
</script>

<style>
#components-layout-demo-custom-trigger{
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  font-size:20px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(255,255,255,1);
  padding: 0 24px;
  background: #002140;
}

#components-layout-demo-custom-trigger .ant-layout-sider {
  background:#001529;
}
#components-layout-demo-custom-trigger .ant-menu-dark{
  background:#001529;
}
</style>

<style lang="scss" scoped>
.user{
  float: right;
  margin-right: 24px;
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(0,0,0,0.65);
  img{
    margin-right: 10px;
  }
  span{
    color:#1890FF;
    cursor: pointer;
  }
}
</style>
