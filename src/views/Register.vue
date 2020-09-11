<template>
  <div class="home">
    <br /><br />
    <h2>REGISTER</h2>
    <br />
    <label>
      <input type="text" name="uName" placeholder="请输入用户名/手机号/邮箱" />
    </label>
    <br />
    <br />
    <label>
      <input type="text" name="uNickname" placeholder="请输入昵称" />
    </label>
    <br />
    <br />
    <label>
      <input type="password" name="uPwd" placeholder="请输入密码" />
    </label>
    <br /><br />
    <label>
      <input type="password" name="uPwdAgain" placeholder="请重复密码" />
    </label>
    <br /><br />
    <label>
      <button type="button" name="uPwd">注册</button>
    </label>
    <div style="height: 4px"></div>
    <p style="color: red">ERROR</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
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
