<template>
  <Navigation />
  <div class="app-content">
    <div id="content-left-list" class="app-content-left">
      <div class="app-content-left-list">
        <ul>
          <li @click="clickChooseLeftTitle('project')" :class="{'active-click-choose' : cssActiveLeftTitle === 'project' }">
            <svg t="1599837988331" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5270" width="20" height="20"><path d="M997.76 494.72l-133.12-76.8 128-72.32a32 32 0 0 0 0-55.68L704 123.52a32 32 0 0 0-32 0L512 213.76 346.88 118.4a32 32 0 0 0-32 0L26.24 284.8a32 32 0 0 0 0 55.68l133.76 76.8-128 72.32a32 32 0 0 0 0 55.68L192 635.52v114.56a32 32 0 0 0 16 27.52l288 166.4a32 32 0 0 0 32 0l288-166.4a32 32 0 1 0-32-55.68L512 880l-256-147.84v-59.52l64 39.04a32 32 0 0 0 32 0L512 620.8l166.4 96a32 32 0 0 0 32 0l106.24-64 181.12-105.6a32 32 0 0 0 0-55.68zM512 288l224 128L512 547.2l-224-128L384 362.88z m172.8-99.84l224 128-108.8 64L576 250.88z m-353.92-5.12L448 250.88l-91.52 53.12L224 380.16 106.24 312.32zM114.56 517.12l108.8-64L320 512l128 71.68-108.8 64z m579.2 135.04L576 583.68 700.16 512l99.84-57.6 117.12 67.84z" fill="#ffffff" p-id="5271"></path></svg>            <span>项目</span>
          </li>
          <li @click="clickChooseLeftTitle('interface')" :class="{'active-click-choose' : cssActiveLeftTitle === 'interface' }">
            <svg t="1599838058946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6126" width="20" height="20"><path d="M426.624 528.661333L98.922667 345.301333c-6.912-4.757333-13.845333-4.757333-20.778667-4.757333C52.757333 340.544 32 364.352 32 390.549333V745.386667c0 35.712 18.453333 69.056 48.469333 88.106666l325.376 183.36c6.933333 4.757333 13.866667 4.757333 20.778667 4.757334 25.386667-2.368 46.144-23.808 46.144-52.373334V612.010667c2.304-33.322667-16.149333-66.666667-46.144-83.349334zM101.738667 768.874667c-7.04-5.205333-9.386667-12.970667-9.386667-23.317334V408.981333l308.394667 176.384c7.061333 5.184 9.408 12.949333 9.408 23.317334v341.205333L101.76 768.853333z m841.813333-425.962667c-6.933333 0-13.866667 2.389333-20.778667 4.778667l-325.397333 183.36a104.64 104.64 0 0 0-48.448 88.106666v354.837334c0 26.197333 18.453333 50.005333 46.144 50.005333 6.933333 0 13.866667-2.389333 20.778667-4.757333L941.226667 835.84c29.994667-16.661333 50.773333-50.005333 50.773333-88.106667V392.96c-2.304-28.586667-20.778667-50.026667-48.469333-50.026667z m-12.032 412.458667c0 7.765333-2.517333 18.133333-10.069333 23.317333L613.333333 951.168V612.288c0-7.765333 2.517333-18.133333 10.069334-23.296l308.117333-172.906667v339.285334z m-17.984-526.762667c2.304-16.661333-6.912-30.933333-20.757333-35.712L560.469333 11.904C544.298667 4.757333 528.149333 0 512 0c-16.149333 2.389333-34.624 4.757333-50.773333 11.904L128.917333 190.506667c-13.845333 7.146667-23.061333 21.44-23.061333 35.733333 0 16.661333 6.912 30.933333 20.757333 35.712l332.309334 178.602667c16.149333 7.146667 32.298667 11.904 50.773333 11.904 16.149333-2.368 34.602667-4.757333 50.773333-11.904l332.309334-176.213334c13.845333-7.146667 23.061333-21.44 20.757333-35.733333z m-421.248 156.16L175.530667 224.426667l313.024-161.706667c13.12-5.44 26.24-5.44 36.736 0l319.765333 166.592-316.032 155.456c-5.248 2.709333-10.496 5.44-18.368 5.44-5.248 0-13.12-2.730667-18.368-5.44z" fill="#ffffff" p-id="6127"></path></svg>            <span>接口</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-content-right">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "@/views/Navigation";
import $ from 'jquery'

export default {
  name: "Home",
  components: { Navigation },
  data () {
    return {
      cssActiveLeftTitle: "project"
    }
  },
  beforeCreate () {
    document.title = "HOME"
  },
  methods: {
    clickChooseLeftTitle(choose) {
      this.cssActiveLeftTitle = choose;
    },
      openOrHiddenLeftList() {
      const $cll = $("#content-left-list");
      if ($cll.width() === 250) {
        $cll.animate({width: "4px"},500)
      } else {
        $cll.animate({width: "250px"},500)
      }
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
  width: 100%;
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
}
  .active-click-choose {
    background: #383838;
    border-right: 4px green solid;
  }
</style>
