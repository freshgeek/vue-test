<template>
  <el-row>
    <el-col>
      <h5>LOGO</h5>
      <el-menu :default-active="$route.path"
               router class="el-menu-vertical-demo">
        <el-menu-item>
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <DeepMenu :menuList="menuList"></DeepMenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import DeepMenu from './DeepMenu';

  export default {
    name: 'SideMenu',
    components: {
      DeepMenu
    },
    data() {
      return {
        menuList: [
          {
            id: 1,
            icon: '',
            name: '登录',
            url: '/login',
            sub: []
          },
          {
            id: 2,
            icon: '',
            name: '用户信息',
            url: '/login',
            sub: []
          },
          {
            id: 11,
            name: '用户管理',
            url: '/userList',
            sub: []
          },
          {
            id: 12,
            name: '页面二',
            url: '/page2'
          },
          {
            id: 123,
            name: '页面三',
            url: '/page3'
          },
          {
            id: 3,
            icon: '',
            name: '导航一级',
            url: '',
            sub: [
              {
                id: 4,
                icon: '',
                name: '导航二级',
                url: '',
                sub: [
                  {
                    id: 5, icon: '',
                    name: '导航三级',
                    url: '',
                    sub: [
                      {
                        id: 6,
                        icon: '',
                        name: '导航四级',
                        url: '/info',
                        sub: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    methods: {}
  };
</script>

<style scoped>

</style>
