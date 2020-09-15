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
          <li>添加接口&nbsp;->&nbsp;{{ projectName }}</li>
        </ul>
      </div>
      <hr />
      <br />
      <div class="hmc-item-content" id="setHeight">
        <div class="hcpc-input-button">
          <label>
            <button
              type="commit"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              添加接口到&nbsp;=>&nbsp;{{ projectName }}
            </button>
          </label>
          <p style="color: red" v-show="showOrHiddenErrorMsg">{{ errorMsg }}</p>
          <br /><br />
          <p style="color: gray">
            添加的接口未提交时将自动保存到本地，下次进入时自动读取
          </p>
        </div>
      </div>
    </div>
  </form>

  <!--确认提交的弹出框-->
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            添加问题到&nbsp;=>&nbsp;{{ projectName }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            不提交
          </button>
          <button
            type="button"
            class="btn btn-primary"
          >
            提交并保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import $ from "jquery";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeAddInterfaceToProjectComponent",
  data() {
    return {
      projectId: String,
      projectName: String,
      problemList: [],
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
      return false;
    }
  },
  watch: {
    problemList: {
      handler: function(val, oldval) {
        this.clickSaveUnSubmittedProblemToLocal();
        FuncCommon.showConsoleInfo(val + oldval);
      },
      deep: true
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

.hcpc-input-button {
  text-align: center;
  margin: 0 0 0 65px;
}

.hcpc-input-button button {
  width: 300px;
  height: 40px;
  background: #d57a01;
  border: 1px #383838 solid;
  border-radius: 8px;
  color: #eeeeee;
  box-shadow: 0 0 0;
  outline: none;
  transition: box-shadow 500ms;
}

.hcpc-input-button button:hover {
  box-shadow: 0 0 8px;
  transition: box-shadow 500ms;
}

table {
  width: 100%;
}
  .modal-dialog {
    max-width: 700px;
  }
</style>
