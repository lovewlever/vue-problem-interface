<template>
  <nav>
    <div
      @click="clickOpenOrHiddenHomeLeft"
      style="margin: auto 0;display: flex"
    >
      <svg
        t="1599818336121"
        class="svg-more"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3692"
        width="24"
        height="24"
      >
        <path
          d="M138.5 261.4h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5zM887.5 470.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5zM887.5 760.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5z"
          p-id="3693"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <h2 class="title-more">PROBLEM</h2>

    <div class="top-search-border">
      <label>
        <input type="text" value="" placeholder="搜索本页面..." />
      </label>
      <p><span>搜索</span></p>
    </div>

    <ul class="nav-user-info">
      <li @click="clickCreateProject">
        <svg
          style="margin-right: 24px"
          t="1599836517593"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3700"
          width="26"
          height="26"
        >
          <path
            d="M821.76 479.488c0 0-6.272-206.4-174.4-247.424S398.208 368.192 396.544 373.248C394.88 378.304 386.624 376 386.624 376c-13.44-12.736-72.704-41.984-134.976-4.48-62.208 37.504-39.68 108.736-39.68 108.736S119.744 472.768 72.448 615.168c-47.232 142.528 118.464 182.912 118.464 182.912l278.144 0 0-151.616-55.68 0L408.512 646.464 404.736 646.464l0-0.256c-3.2 0-5.76-2.56-5.76-5.824 0-1.92 1.024-3.584 2.56-4.672l113.984-119.872c1.6-1.792 3.84-3.008 6.464-3.008 2.688 0 5.056 1.344 6.656 3.328l113.152 118.912c0.192 0.128 0.384 0.32 0.576 0.512l1.088 1.152-0.384 0c0.576 1.024 0.96 1.92 0.96 3.136 0 3.584-2.88 6.528-6.528 6.528-0.128 0-0.128-0.128-0.256-0.128l0 0.256L575.936 646.528l0 151.616 252.48 0c0 0 120.384-30.144 131.008-154.432C970.176 519.424 821.76 479.488 821.76 479.488z"
            p-id="3701"
            fill="#ffffff"
          ></path>
        </svg>
      </li>
      <li>
        <svg
          style="margin-right: 24px"
          t="1599835265293"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="819"
          width="18"
          height="18"
        >
          <path
            d="M287.8 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM287.8 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM287.8 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32z"
            p-id="820"
            fill="#ffffff"
          ></path>
        </svg>
      </li>
      <li @click.prevent="clickShowUserPopup">
        <img
          v-bind:src="userAvatar"
          height="26"
          width="26"
          alt="avatar"
          style="border-radius: 50%;background: black"
          v-show="userNickname !== '未登录'"
        />
        <p class="nav-user-nickname">{{ userNickname }}</p>
      </li>
    </ul>

    <div
      @click.prevent="clickShowUserPopup"
      style="position: absolute;width: 100%;height: 1000px;display: none"
      data-upopup-show="false"
      id="userPopup"
    >
      <div class="user-popup">
        <a class="user-popup-item" href="#">{{ userNickname }}</a>
        <div class="user-popup-item-divider"></div>
        <a class="user-popup-item" href="#">设置</a>
        <a class="user-popup-item" href="#">查看通知</a>
        <div class="user-popup-item-divider"></div>
        <a @click.prevent="clickLogOut" class="user-popup-item" href="#">退出账号</a>
      </div>
    </div>
  </nav>
</template>

<script>
import FuncCommon from "../constants/FuncCommon";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import $ from "jquery";
export default {
  name: "Navigation",
  data() {
    return {
      userNickname: "未登录",
      userAvatar: require("../assets/logo.png")
    };
  },
  methods: {
    clickOpenOrHiddenHomeLeft() {
      this.$parent.openOrHiddenLeftList();
    },
    clickCreateProject() {
      this.$parent.createProject();
    },
    clickShowUserPopup: function() {
      let $userPopup = $("#userPopup");
      let attribute = $userPopup[0].getAttribute("data-upopup-show");
      FuncCommon.showConsoleInfo("data-upopup-show:");
      FuncCommon.showConsoleInfo(attribute);
      if (attribute === "true") {
        $userPopup.hide();
        $userPopup[0].setAttribute("data-upopup-show", "false");
      } else {
        $userPopup.show();
        $userPopup[0].setAttribute("data-upopup-show", "true");
      }
    },
    clickLogOut() {
      window.localStorage.clear();
      this.$router.push("/");
    }
  },
  created() {
    let storageLoginInfo = FuncCommon.getStorageLoginInfo();
    if (storageLoginInfo === null) {
      this.$router.push({path: "/login",query:{timestamp:FuncCommon.getTimestamp()}});
    } else {
      this.userNickname = storageLoginInfo.unickname;
      if (storageLoginInfo.uavatar !== "") {
        this.userAvatar = storageLoginInfo.uavatar;
      }
    }
  }
};
</script>

<style scoped>
nav {
  margin: 0;
  height: 48px;
  width: 100%;
  background: #202020;
  position: fixed;
  top: 0;
  box-shadow: 0 0 12px #181818;
  display: flex;
}
.svg-more {
  margin: auto 0 auto 24px;
}

.svg-more:hover {
  cursor: pointer;
}
.title-more {
  margin: auto 0 auto 24px;
  padding-top: 2px;
}
.title-more:hover {
  cursor: pointer;
}
.nav-user-info {
  margin: auto 24px auto auto;
  list-style-type: none;
  text-align: center;
  display: flex;
}
.nav-user-info li {
  margin: auto;
  display: flex;
}

.nav-user-info li:hover {
  cursor: pointer;
}

.nav-user-info li svg,
img {
  margin: auto;
  display: flex;
}
.nav-user-info li svg,
img :hover {
  cursor: pointer;
}
.nav-user-nickname {
  margin: 0 0 0 8px;
  text-align: center;
  color: wheat;
  padding: 4px 0 0 0;
  max-width: 96px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.top-search-border {
  border-radius: 6px;
  margin: auto auto auto auto;
  display: flex;
  height: 30px;
  border: 1px #6f6f6f solid;
  background: #121212;
}

.top-search-border:focus {
  border: 1px green solid;
}
.top-search-border label {
  margin: 0;
}
.top-search-border label input {
  margin: 0;
  background: none;
  border: none;
  width: 400px;
  height: 100%;
  font-size: 0.8rem;
  color: whitesmoke;
  padding: 0 8px 0 8px;
  outline: none;
}
.top-search-border label input::-webkit-input-placeholder {
  color: #6f6f6f;
}
.top-search-border p {
  margin: auto 0;
  width: 70px;
  height: 100%;
  background: #313131;
  font-size: 0.8rem;
  text-align: center;
  display: flex;
  color: #6f6f6f;
  border-radius: 0 6px 6px 0;
}

.top-search-border p:hover {
  cursor: pointer;
}
.top-search-border p span {
  margin: auto;
}
.user-popup {
  position: absolute;
  right: 24px;
  top: 49px;
  background: #202020;
  border: 1px #383838 solid;
  border-radius: 4px;
  color: #f4f4f4;
}
.user-popup-item {
  color: #f4f4f4;
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.user-popup-item-divider {
  height: 0;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #383838;
}
</style>
