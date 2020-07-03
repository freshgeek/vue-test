<template>
  <!-- 内容区 -->
  <div class="app-wrap">
    <!-- 此处放置el-tabs代码 -->
    <div>
      <el-tabs
        v-model="activeIndex"
        type="border-card"
        closable
        v-if="openTab.length"
        @tab-click='tabClick'
        @tab-remove='tabRemove'
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item) in openTab"
          :label="item.name"
          :name="item.route"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-wrap">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    data() {
      return {};
    },
    methods: {
      //tab标签点击时，切换相应的路由
      tabClick(tab) {
        this.$router.push({path: this.activeIndex});
      },
      //移除tab标签
      tabRemove(targetName) {
        //首页不删
        if (targetName == '/') {
          return;
        }
        this.$store.commit('delete_tabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.openTab && this.openTab.length >= 1) {
            this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: '/'});
          }
        }
      }
    },
    mounted() {

      // 默认添加一个主页
      this.$store.commit('add_tabs', {route: '/', name: '主页'});

      // 刷新时以当前路由做为tab加入tabs
      // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
      // 当当前路由是首页时，添加首页到store，并设置激活状态

      if (this.$route.path !== '/') {
        this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.name});
        this.$store.commit('set_active_index', this.$route.path);
      } else {
        this.$store.commit('set_active_index', '/');
        this.$router.push('/');
      }
    },
    computed: {
      // 计算变化,同时更新到 $store.state
      openTab() {
        return this.$store.state.openTab;
      },
      activeIndex: {
        get() {
          return this.$store.state.activeIndex;
        },
        set(val) {
          this.$store.commit('set_active_index', val);
        }
      }
    },
    watch: {
      '$route'(to, from) {
        //判断路由是否已经打开
        //已经打开的 ，将其置为active
        //未打开的，将其放入队列里
        let flag = false;
        for (let item of this.openTab) {
          if (item.name === to.name) {
            this.$store.commit('set_active_index', to.path);
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: to.path, name: to.name});
          this.$store.commit('set_active_index', to.path);
        }
      }
    }
  };
</script>


<style scoped>
  .app-wrap {
    padding: 20px;
  }
  .content-wrap {
    border: 1px solid #DCDFF7;
    border-top: none;
  }
  /*去除tab 面板的无用边框 适配路由渲染*/
  .el-tabs.el-tabs--border-card {
    box-shadow: none;
    border-bottom: none;
  }
</style>

