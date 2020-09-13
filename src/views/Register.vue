<template>
  <form
    method="post"
    action="/"
    accept-charset="UTF-8"
    enctype="application/x-www-form-urlencoded"
    @submit.prevent="commitRegister"
  >
    <div class="home">
      <br /><br />
      <h2>REGISTER</h2>
      <br />
      <label>
        <input
          type="text"
          name="uName"
          placeholder="请输入用户名/手机号/邮箱"
          v-model="inputAccount"
          required
        />
      </label>
      <br />
      <br />
      <label>
        <input
          type="text"
          name="uNickname"
          placeholder="请输入昵称"
          v-model="inputNickname"
          required
        />
      </label>
      <br />
      <br />
      <label>
        <input
          type="password"
          name="uPwd"
          placeholder="请输入密码"
          v-model="inputPwd"
          required
        />
      </label>
      <br /><br />
      <label>
        <input
          type="password"
          name="uPwdAgain"
          placeholder="请重复密码"
          v-model="inputPwdAgain"
          required
        />
      </label>
      <br /><br />
      <div>
        <label>
          <input
            type="number"
            placeholder="请输入验证码"
            style="width: 164px"
            v-model="inputCode"
            required
          />
        </label>
        <img :src="verifyCodeUrl" alt="code" width="80" height="35" @click="loadVerifyCode"/>
      </div>
      <br />
      <label>
        <button type="submit" name="uPwd">注册</button>
      </label>
      <div style="height: 4px"></div>
      <p style="color: red" v-show="showOrHiddenErrorDes">{{ errorMsg }}</p>
    </div>
  </form>
</template>

<script>
import _axios from "axios";
import ConstWeb from "../constants/ConstWeb";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "Home",
  data() {
    return {
      verifyCodeUrl: "",
      inputNickname: "",
      inputAccount: "",
      inputPwd: "",
      inputPwdAgain: "",
      inputCode: "",
      errorMsg: "",
      showOrHiddenErrorDes: false
    };
  },
  components: {},
  beforeCreate() {
    document.title = "REGISTER";
  },
  created() {
    this.loadVerifyCode();
  },
  methods: {
    commitRegister() {
      //注册
      this.showOrHiddenErrorDes = false;
      if (this.inputAccount.trim().length < 6) {
        this.errorMsg = "账号长度不小于6";
        this.showOrHiddenErrorDes = true;
      } else if (this.inputNickname.trim().length < 2) {
        this.errorMsg = "昵称长度不小于2";
        this.showOrHiddenErrorDes = true;
      } else if (this.inputPwd.trim().length < 6) {
        this.errorMsg = "密码长度不小于6";
        this.showOrHiddenErrorDes = true;
      } else if (this.inputPwd !== this.inputPwdAgain) {
        this.errorMsg = "两次密码不一致！";
        this.showOrHiddenErrorDes = true;
      } else {
        let urlParams = new URLSearchParams();
        urlParams.append("account", this.inputAccount);
        urlParams.append("nickname", this.inputNickname);
        urlParams.append("pwd", this.inputPwd);
        urlParams.append("verifyCode", this.inputCode);
        urlParams.append("sessionKey", FuncCommon.getSessionKey());
        _axios({
          url: ConstWeb.WebApi.USER_REGISTER,
          data: urlParams,
          method: "POST"
        },{ withCredentials: true })
          .then(data => {
            console.info(data);
            if (data.data.code === 200) {
              let timer = setInterval(() => {
                this.$router.push("/login");
                clearInterval(timer);
              }, 1000);
            }
            this.errorMsg = data.data.msg;
            this.showOrHiddenErrorDes = true;
          })
          .catch(error => {
            this.errorMsg = "注册失败：" + error;
            this.showOrHiddenErrorDes = true;
          });
      }
      return false;
    },
    loadVerifyCode() {
      //获取验证码
      FuncCommon.getVerify(
        data => {
          console.info(data);
          this.verifyCodeUrl = data;
        },
        error => {
          this.errorMsg = "验证码获取失败：" + error;
          this.showOrHiddenErrorDes = true;
        }
      );
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
</style>
