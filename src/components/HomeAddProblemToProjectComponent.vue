<template>
  <form
    method="post"
    action="/"
    enctype="application/x-www-form-urlencoded"
    @submit.prevent="clickCommit"
  >
    <div>
      <div>
        <ul class="hmc-top-label">
          <li>添加问题&nbsp;->&nbsp;{{projectName}}</li>
        </ul>
      </div>
      <hr />
      <br />
      <div class="hmc-item-content" id="setHeight">
        <div style="display: flex;width: 100%">
          <div style="flex: 1;margin: 25px;display: flex;">
            <div class="align-left ">
              <p class="no-margin">出现问题的终端：</p>
              <p class="no-margin item-title-desc">必选</p>
              <label>
                <select class="input-height uniform-style item-sel-devices " name="devices" >
                  <option label="请选择" value=""></option>
                </select>
              </label> <span>&nbsp;=>&nbsp;</span>
            </div>

            <div class="align-left ">
              <p class="no-margin">请添加出现问题的页面</p>
              <p class="no-margin item-title-desc">如：我的页面</p>
              <label>
                <input type="text" value="" name="page" placeholder="" class="input-height uniform-style">
              </label><span>&nbsp;=>&nbsp;</span>
            </div>

            <div  class="align-left" style="flex: 1">
              <p class="no-margin">请添加问题描述</p>
              <p  class="no-margin item-title-desc">如：</p>
              <label style="width: 100%">
                <textarea type="text"  name="page" placeholder="" class="input-height uniform-style item-input-problem"></textarea>
                <span>++</span>
              </label>
            </div>

          </div>
        </div>

      </div>
    </div>
  </form>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import $ from "jquery";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeAddProblemToProjectComponent",
  data() {
    return {
      problemDevices: "", //出现问题的终端
      projectDesc: "",
      problemPageName: "",//出现问题的页面名称
      projectId: String,
      projectName: String,
      errorMsg: "",
      showOrHiddenErrorMsg: false
    };
  },
  components: {},
  created() {
    this.projectId = this.$route.query.projectId;
    this.projectName = this.$route.query.projectName;
    FuncCommon.showConsoleInfo(this.projectId);
  },
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 160);
    window.onresize = () => {
      return (() => {
        FuncCommon.showConsoleInfo(
          document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 160);
      })();
    };
  },
  methods: {
    clickCommit() {
      return false
    }
  }
};
</script>

<style scoped>
.hmc-top-label {
  list-style-type: none;
  text-align: left;
  margin: 3px 0 13px 0;
}

.hmc-top-label li {
  display: inline;
  margin: auto 12px;
  padding: 4px 10px 4px 10px;
  font-size: 1.5rem;
  color: #696969;
}

.hmc-top-label li:hover {
  cursor: pointer;
}

.hmc-item-content {
  margin: auto 0;
  overflow-y: auto;
  height: auto;
}

.hmc-item-content::-webkit-scrollbar {
  display: none;
}

.page-item a {
  background: #202020;
  border-color: #383838;
}

hr {
  background: #383838;
}

.no-margin {
  margin: 0;
}
  .align-left {
    text-align: left;
  }
  .input-height {
    height:42px;
  }
  .item-title-desc {
    font-size: 0.6rem;
    color: gray;
    margin-bottom: 4px;
    margin-left: 4px;
  }
  .item-sel-devices {
    width: 140px;
  }
  .uniform-style {
    border-radius: 6px;
    background: #202020;
    color: wheat;
    padding: 0 4px 0 6px;
    border: 1px #616061 solid;
  }
  .item-input-problem {
    width: 90%;
    height: 100px;
  }
</style>
