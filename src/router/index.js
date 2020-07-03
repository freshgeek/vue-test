import Vue from 'vue';
import VueRouter from 'vue-router';
import UserInfo from '../views/user/UserInfo';
import Login from '../views/user/Login';
import userList from '../views/userList';
import page2 from '../views/page2';
import page3 from '../views/page3';

Vue.use(VueRouter);


export default new VueRouter({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    }, {
      path: '/info',
      name: '用户信息',
      component: UserInfo
    }, {
      path: '/userList',
      name: '用户管理',
      component: userList
    }, {
      path: '/page2',
      name: '页面2',
      component: page2
    }, {
      path: '/page3',
      name: '页面3',
      component: page3
    }, {
      path: '*',
      redirect: '/login'
    }]
});
