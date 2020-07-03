<template>
  <div>

    <el-button @click="dialogFormVisible = true;resetForm('loginForm');">新增</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
        <el-form-item label="id" prop="id" v-show="false"  >
          <el-input v-model="loginForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;resetForm('loginForm');">取 消</el-button>
        <el-button type="primary" @click="submitForm('loginForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-popover
      placement="top"
      width="160"
      v-model="visible">
      <p>确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="remove">确定</el-button>
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover>
    <el-table @selection-change="handleSelectionChange"
              :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="password">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import api from '../config/api';

  export default {
    name: 'userList',
    data() {
      return {
        visible: false,
        dialogFormVisible: false,
        loginForm: {
          name: '',
          password: ''
        },
        loginRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur'}]
        },
        multipleSelection: [],
        tableData: []
      };
    }, mounted() {
      this.load();
    }, methods: {
      edit(v) {
        this.loginForm.name = v.name;
        this.loginForm.password = v.password;
        this.loginForm.id = v.id;
        this.dialogFormVisible = true;
      },
      handleClick(v) {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      load() {
        api.fetchGet('/user/list', null).then((data) => {
          console.log(data);
          this.tableData = data.data;
        }).catch(err => {
          console.log(err);
        });
      },
      remove() {
        let ids = [];
        let me = this;
        for (let i in this.multipleSelection) {
          ids.push(this.multipleSelection[i].id);
        }
        console.log(ids);
        if (!ids ||ids.length <= 0) {
           this.visible = false;
          this.$message.warning('未选择');
          return false;
        }
        api.fetchPost('/user/batch?ids=' + ids.join('&ids='), null).then(res => {
          me.visible = false;
          if (res.code == 200) {
            me.load();
            this.$message({
              type: 'warning',
              message: '删除成功'
            });
          } else {
            this.$message.error('删除失败');
          }

        });
      },
      save(){
        let me = this;

      },
      update(){

      },
      submitForm(formName) {
        let me = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.fetchPost(me.loginForm.id?'/user/update':'/user/insert', me.loginForm).then((res) => {
              if (res.code == 200) {
                me.$message({
                  message: '成功',
                  type: 'success'
                });
                me.dialogFormVisible = false;
                me.resetForm('loginForm');
                me.load();
              } else {
                me.$message.error(res.message);
              }
            }).catch(err => {
              me.$message.error(err);
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        debugger;
      }
    }
  };
</script>

<style scoped>

</style>
