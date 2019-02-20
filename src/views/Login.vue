<template>
  <div class="login-container">
    <el-card class="login-card" shadow="always">
      <h2 slot="header" class="login-title">
        华工二手市场后台
      </h2>
      <el-form :model="loginForm" label-width="60px" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-button native-type="submit" type="primary" class="login-button">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '../api';

export default Vue.extend({
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      await login(this.loginForm.username, this.loginForm.password)
      this.$router.replace({name: 'dashboard'});
    }
  }
});
</script>


<style lang="scss" scoped>
.login {
  &-title {
    text-align: center;
  }

  &-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: gray;
    min-height: 100vh;
  }

  &-card {
    width: 320px;
    margin-top: 6em;
  }
  &-button {
    width: 100%;
  }
}
</style>
