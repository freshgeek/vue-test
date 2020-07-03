<template>
  <div>
    <template v-for="menu in menuList">
      <el-menu-item v-if="!menu.sub||menu.sub.length==0"
                    :key="menu.id" :index="menu.url">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
      <el-submenu v-else
                  :key="menu.id" :index="menu.url">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span> {{menu.name}}</span>
        </template>
        <DeepMenu :menuList="menu.sub"></DeepMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>

  export default {
    name: 'DeepMenu',
    props: ['menuList'],
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style scoped>

</style>
