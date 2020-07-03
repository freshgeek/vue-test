<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <SideMenu/>
      </el-aside>
      <el-container>
        <el-header>
          <HeadNav/>
        </el-header>
        <el-main  >
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import SideMenu from './components/common/SideMenu';
  import HeadNav from './components/common/HeadNav';
  import AppMain from './components/common/AppMain';
  export default {
    name: 'App',
    components: {
      AppMain,
      HeadNav,
      SideMenu
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
  }
</style>
