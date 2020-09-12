<template>
  <form
    method="post"
    enctype="application/x-www-form-urlencoded"
    action="/"
    @submit.prevent="clickLoginCommit"
  >
    <div class="home">
      <br /><br />
      <h2>SING IN TO PROBLEM</h2>
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
          type="password"
          name="uPwd"
          placeholder="请输入密码"
          v-model="inputPwd"
          required
        />
      </label>
      <br />
      <br />
      <div>
        <label>
          <input
            type="number"
            placeholder="请输入验证码"
            style="width: 170px"
            v-model="inputCode"
            required
          />
        </label>
        <img :src="verifyCodeUrl" alt="code" width="80" height="35" />
      </div>
      <div style="height: 8px"></div>
      <div class="login-register-forget">
        <span><router-link to="/register">注册</router-link></span>
        <span><router-link to="#">忘记密码</router-link></span>
      </div>
      <div style="height: 8px"></div>
      <label>
        <button type="submit" name="uPwd">验证</button>
      </label>
      <div style="height: 4px"></div>
      <p style="color: red" v-show="showOrHiddenErrorDes">{{ errorMsg }}</p>
    </div>
  </form>
</template>

<script>
import ConstWeb from "../constants/ConstWeb";
import _axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      verifyCodeUrl: "",
      inputAccount: "",
      inputPwd: "",
      inputCode: "",
      errorMsg: "",
      showOrHiddenErrorDes: false
    };
  },
  components: {},
  beforeCreate() {
    document.title = "SING IN";
  },
  created() {
    this.loadVerifyCode();
  },
  methods: {
    clickLoginCommit() {
      //登录
      if (this.inputAccount.length < 6) {
        this.errorMsg = "账号长度不小于6";
        this.showOrHiddenErrorDes = true;
      } else {
        let urlParams = new URLSearchParams();
        urlParams.append("account", this.inputAccount);
        urlParams.append("pwd", this.inputPwd);
        _axios({
          url: ConstWeb.WebApi.USER_LOGIN,
          data: urlParams,
          method: "POST"
        })
          .then(data => {
            console.info(data);
            if (data.data.code === 200) {
              let timer = setInterval(() => {
                this.saveLoginInfo(data.data);
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
    },
    loadVerifyCode() {
      //获取验证码
      _axios(
        {
          url: ConstWeb.WebApi.USER_GET_VERIFY_CODE_IMG,
          data: {},
          responseType: "arraybuffer",
          method: "POST"
        },
        {}
      )
        .then(data => {
          console.info(data);
          this.verifyCodeUrl = arrayBufferToBase64(data.data);
        })
        .catch(error => {
          this.errorMsg = "验证码获取失败：" + error.message();
          this.showOrHiddenErrorDes = true;
        });
    },
    saveLoginInfo(info) {
      //保存登录信息
      window.localStorage.setItem(
        ConstWeb.STORAGE_KEY.KEY_USER_LOGIN_INFO,
        JSON.stringify(info)
      );
      this.$router.push("/home");
    }
  }
};

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:image/jpeg;base64," + window.btoa(binary);
}
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
