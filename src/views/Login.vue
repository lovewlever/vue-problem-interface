<template>
  <div class="home">
    <br /><br />
    <h2>SING IN TO PROBLEM</h2>
    <br />
    <label>
      <input type="text" name="uName" placeholder="请输入用户名/手机号/邮箱" />
    </label>
    <br />
    <br />
    <label>
      <input type="password" name="uPwd" placeholder="请输入密码" />
    </label>
    <div style="height: 8px"></div>
    <div class="login-register-forget">
      <span><router-link to="/register">注册</router-link></span>
      <span><router-link to="#">忘记密码</router-link></span>
    </div>
    <div style="height: 8px"></div>
    <label>
      <button type="button" name="uPwd" @click="clickToHome">验证</button>
    </label>
    <div style="height: 4px"></div>
    <p style="color: red">ERROR</p>
  </div>
</template>

<script>
import $axios from "axios";
import ConstWeb from "@/constants/ConstWeb";

export default {
  name: "Home",
  components: {},
  beforeCreate() {
    document.title = "SING IN";
  },
  created() {
    this.queryVerifyCode();
  },
  methods: {
    clickToHome() {
      this.$router.push("/home");
    },
    queryVerifyCode() {
      // 请求验证码
      $axios
        .get(ConstWeb.WebApi.USER_LOGIN, {
          params: {
            account: "test",
            pwd: 123456
          }
        })
        .then(data => {
          console.info(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
input {
  height: 40px;
  width: 250px;
  text-align: center;
  border: 1px #eeeeee solid;
  border-radius: 8px;
  box-shadow: 0 0 0px #eeeeee;
  transition: box-shadow 500ms;
}

input:focus {
  outline: none;
  box-shadow: 0 0 10px #eeeeee;
  transition: box-shadow 500ms;
}
button {
  height: 40px;
  width: 250px;
  border-radius: 8px;
  color: white;
  border: 1px rgb(65, 184, 131) solid;
  background: rgb(65, 184, 131);
  box-shadow: 0 0 0px rgb(65, 184, 131);
  transition: box-shadow 500ms;
  outline: none;
}
button:hover {
  box-shadow: 0 0 10px rgb(65, 184, 131);
  transition: box-shadow 500ms;
  cursor: pointer;
}

.login-register-forget {
  height: auto;
  width: 250px;
  text-align: right;
  margin: 0 auto;
}
.login-register-forget span {
  margin: 0 0 0 16px;
  font-size: 0.75rem;
}
.login-register-forget span:hover {
  cursor: pointer;
}
</style>
