<template>
  <Navigation />
  <div class="app-content">
    <div id="content-left-list" class="app-content-left">
      <div class="app-content-left-list">
        <ul>
          <li
            @click="clickChooseLeftTitle('mine')"
            :class="{ 'active-click-choose': cssActiveLeftTitle === 'mine' }"
          >
            <svg t="1599925203917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2044" width="20" height="20"><path d="M988.234962 1024H35.765038C16.076204 1024 0 1007.923796 0 988.234962c0-19.869466 16.076204-35.765038 35.765038-35.765038H988.054331c19.869466 0 35.765038 16.076204 35.765037 35.765038 0.180632 19.688834-15.895572 35.765038-35.584406 35.765038zM512.090316 72.252602c95.734697 0 185.869818 37.390721 253.606632 105.127536S870.643853 335.071441 870.643853 430.98677 833.433763 616.856588 765.696948 684.593403s-157.871935 105.127536-253.606632 105.127535-185.869818-37.390721-253.606633-105.127535-105.127536-157.871935-105.127536-253.606633S190.566237 245.116952 258.303052 177.380138 416.174987 72.252602 512.090316 72.252602m0-72.252602C274.017993 0 81.103546 192.914447 81.103546 430.98677s192.914447 430.98677 430.98677 430.98677S942.896454 668.878462 942.896454 430.98677 749.982007 0 512.090316 0z" fill="#ffffff" p-id="2045"></path></svg>
            <span>我的</span>
          </li>
          <li
            @click="clickChooseLeftTitle('project')"
            :class="{ 'active-click-choose': cssActiveLeftTitle === 'project' }"
          >
            <svg t="1599925395365" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8377" width="22" height="22"><path d="M141.9 419.2L454.1 598c18.2 10.6 38.9 16.3 59.9 16.3 21.2 0 41.7-5.6 59.4-16.3l312.4-178.6c21.7-11.8 35.2-36.5 34.5-63.1-0.8-26.2-15.4-50.2-37.4-61.2L567.3 137.6c-33.9-16.9-72.8-16.9-106.6 0L144.9 295.2c-22.5 11.6-36.4 34.5-37.2 61.1-0.8 26.3 12.3 50.4 34.2 62.9z m22.3-85.9l315.6-157.5c10.9-5.4 22.5-8.2 34.2-8.2 11.7 0 23.4 2.7 34.2 8.2l315.5 157.5c8.1 4 13.5 13.6 13.8 24.2 0.3 10.6-4.5 20.2-12.2 24.3L552 561l-0.5 0.3c-11 6.7-24 10.2-37.5 10.2s-26.7-3.6-38.5-10.5L163.1 382.2c-8-4.6-13-14.3-12.7-24.6 0.3-10.9 5.6-20 13.8-24.3zM888.4 646.3l-369 211c-3.5 2-7.1 2-10.7-0.1L139.6 646.3c-10.3-5.9-23.3-2.3-29.1 7.9-5.9 10.2-2.3 23.3 7.9 29.1l368.8 210.8c8.4 4.9 17.6 7.3 26.7 7.3 9.2 0 18.3-2.4 26.6-7.2l368.9-210.9c10.2-5.9 13.8-18.9 7.9-29.1-5.6-10.2-18.7-13.8-28.9-7.9z" p-id="8378" fill="#ffffff"></path><path d="M888.4 508.9l-369 211c-3.5 2-7.1 2-10.7-0.1L139.6 508.9c-10.3-5.9-23.3-2.3-29.1 7.9-5.9 10.2-2.3 23.3 7.9 29.1l368.8 210.8c8.4 4.9 17.6 7.3 26.7 7.3 9.2 0 18.3-2.4 26.6-7.2L909.6 546c10.2-5.9 13.8-18.9 7.9-29.1-5.8-10.3-18.9-13.8-29.1-8z" p-id="8379" fill="#ffffff"></path></svg>
            <span>项目</span>
          </li>

          <li
            @click="clickChooseLeftTitle('problem')"
            :class="{ 'active-click-choose': cssActiveLeftTitle === 'problem' }"
          >
            <svg t="1599925258933" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4366" width="22" height="22"><path d="M520 307.2c-117.52 0-212.8 95.28-212.8 212.8 0 117.52 95.28 212.8 212.8 212.8 46.64 0 89.44-15.44 124.464-40.912l-85.44-85.44a33.584 33.584 0 0 1 0-47.408 33.584 33.584 0 0 1 47.44 0l85.472 85.424c25.424-35.04 40.864-77.824 40.864-124.464 0-117.52-95.28-212.8-212.8-212.8z m0-243.2C268.112 64 64 268.112 64 520S268.112 976 520 976 976 771.888 976 520 771.888 64 520 64z m262.832 671.408c13.136 13.136 13.136 34.352 0 47.424-13.072 13.136-34.288 13.136-47.424 0l-47.968-47.904c-46.4 36.24-104.032 58.672-167.44 58.672-151.088 0-273.6-122.512-273.6-273.6 0-151.088 122.512-273.6 273.6-273.6 151.088 0 273.6 122.512 273.6 273.6 0 63.408-22.496 121.056-58.672 167.504l47.904 47.904z" p-id="4367" fill="#ffffff"></path></svg>
            <span>问题</span>
          </li>

          <li
            @click="clickChooseLeftTitle('interface')"
            :class="{
              'active-click-choose': cssActiveLeftTitle === 'interface'
            }"
          >
            <svg
              t="1599838058946"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6126"
              width="20"
              height="20"
            >
              <path
                d="M426.624 528.661333L98.922667 345.301333c-6.912-4.757333-13.845333-4.757333-20.778667-4.757333C52.757333 340.544 32 364.352 32 390.549333V745.386667c0 35.712 18.453333 69.056 48.469333 88.106666l325.376 183.36c6.933333 4.757333 13.866667 4.757333 20.778667 4.757334 25.386667-2.368 46.144-23.808 46.144-52.373334V612.010667c2.304-33.322667-16.149333-66.666667-46.144-83.349334zM101.738667 768.874667c-7.04-5.205333-9.386667-12.970667-9.386667-23.317334V408.981333l308.394667 176.384c7.061333 5.184 9.408 12.949333 9.408 23.317334v341.205333L101.76 768.853333z m841.813333-425.962667c-6.933333 0-13.866667 2.389333-20.778667 4.778667l-325.397333 183.36a104.64 104.64 0 0 0-48.448 88.106666v354.837334c0 26.197333 18.453333 50.005333 46.144 50.005333 6.933333 0 13.866667-2.389333 20.778667-4.757333L941.226667 835.84c29.994667-16.661333 50.773333-50.005333 50.773333-88.106667V392.96c-2.304-28.586667-20.778667-50.026667-48.469333-50.026667z m-12.032 412.458667c0 7.765333-2.517333 18.133333-10.069333 23.317333L613.333333 951.168V612.288c0-7.765333 2.517333-18.133333 10.069334-23.296l308.117333-172.906667v339.285334z m-17.984-526.762667c2.304-16.661333-6.912-30.933333-20.757333-35.712L560.469333 11.904C544.298667 4.757333 528.149333 0 512 0c-16.149333 2.389333-34.624 4.757333-50.773333 11.904L128.917333 190.506667c-13.845333 7.146667-23.061333 21.44-23.061333 35.733333 0 16.661333 6.912 30.933333 20.757333 35.712l332.309334 178.602667c16.149333 7.146667 32.298667 11.904 50.773333 11.904 16.149333-2.368 34.602667-4.757333 50.773333-11.904l332.309334-176.213334c13.845333-7.146667 23.061333-21.44 20.757333-35.733333z m-421.248 156.16L175.530667 224.426667l313.024-161.706667c13.12-5.44 26.24-5.44 36.736 0l319.765333 166.592-316.032 155.456c-5.248 2.709333-10.496 5.44-18.368 5.44-5.248 0-13.12-2.730667-18.368-5.44z"
                fill="#ffffff"
                p-id="6127"
              ></path>
            </svg>
            <span>接口</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-content-right">
      <div class="app-content-right-c">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/views/Navigation";
import $ from "jquery";

export default {
  name: "Home",
  components: { Navigation },
  data() {
    return {
      cssActiveLeftTitle: "mine"
    };
  },
  beforeCreate() {
    document.title = "HOME";
  },
  created() {
    let timer = setInterval(() => {
      this.openOrHiddenLeftList();
      clearInterval(timer);
    }, 1000);
  },
  methods: {
    clickChooseLeftTitle(choose) {
      this.cssActiveLeftTitle = choose;
      if (choose === "mine") {
        //跳转我的
        this.$router.push("/homeMineComponent");
      } else if (choose === "project") {
        // 跳转项目列表
        this.$router.push("/homeProjectListComponent");
      } else if (choose === "problem") {
        // 跳转项目问题列表
        this.$router.push("/homeProblemComponent");
      }
    },
    openOrHiddenLeftList() {
      const $cll = $("#content-left-list");
      const $span = $("#content-left-list ul li span");
      if ($cll.width() === 250) {
        $cll.animate({ width: "100px" }, 500);
        $span.animate({ opacity: 0 }, 100);
      } else {
        $cll.animate({ width: "250px" }, 500);
        $span.animate({ opacity: 1 }, 100);
      }
    },
    createProject() {
      this.cssActiveLeftTitle = "project";
      this.$router.push("/homeCreateProjectComponent");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
}
.app-content {
  width: 100%;
  height: 100%;
  margin: 0 0 0 0;
  display: flex;
}
.app-content-left {
  width: 250px;
  height: 100%;
  background: #202020;
}

.app-content-left-list {
  margin-top: 60px;
}
.app-content-left-list ul {
  margin: 0;
  padding: 0;
  text-align: center;
}
.app-content-left-list ul li {
  list-style: none;
  height: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  color: #eeeeee;
  font-size: 0.95rem;
  cursor: pointer;
}

.app-content-left-list ul li:hover {
  list-style: none;
  height: 40px;
  text-align: center;
  background: #383838;
  margin: 0;
  padding: 0;
  display: flex;
}
.app-content-left-list ul li svg {
  margin: auto 0 auto 24px;
}
.app-content-left-list ul li span {
  margin: auto auto auto 24px;
}
.app-content-right {
  flex: 1;
  height: 100%;
  background: #181818;
  display: flex;
  flex-direction: column;
}
.app-content-right-c {
  padding: 60px 0 0 0;
  flex: 1;
  margin: 0;
}
.active-click-choose {
  background: #383838;
  border-right: 4px green solid;
}
</style>
