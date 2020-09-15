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
          <li>添加问题&nbsp;->&nbsp;{{ projectName }}</li>
        </ul>
      </div>
      <hr />
      <br />
      <div class="hmc-item-content" id="setHeight">
        <template v-for="(obj, index) in problemList" :key="index">
          <div style="display: flex;width: 100%">
            <div style="flex: 1;margin: 25px;display: flex;">
              <div class="align-left ">
                <p class="no-margin item-title">出现问题的终端：</p>
                <p class="no-margin item-title-desc">必选</p>
                <label>
                  <select
                    required
                    class="input-height uniform-style item-sel-devices "
                    name="devices"
                    v-model="obj.problemChooseDeviceId"
                  >
                    <option label="请选择" value="" selected></option>
                    <option
                      v-for="(dev, index) in obj?.devicesList"
                      :key="index"
                      :label="dev?.systemDevicesName"
                      :value="dev?.id"
                      :selected="obj.problemChooseDeviceId === dev?.id"
                    ></option>
                  </select>
                </label>
                <span>&nbsp;=>&nbsp;</span>
              </div>

              <div class="align-left ">
                <p class="no-margin item-title">请添加出现问题的页面</p>
                <p class="no-margin item-title-desc">如：我的页面</p>
                <label>
                  <input
                    type="text"
                    v-model="obj.problemModulePage"
                    name="page"
                    placeholder=""
                    required
                    class="input-height uniform-style"
                  /> </label
                ><span>&nbsp;=>&nbsp;</span>
              </div>

              <div class="align-left" style="flex: 1">
                <p class="no-margin item-title">请添加问题详情</p>
                <p class="no-margin item-title-desc">如：</p>
                <label style="width: 100%;display: flex">
                  <textarea
                    type="text"
                    name="page"
                    placeholder=""
                    required
                    v-model="obj.problemContent"
                    class="input-height uniform-style item-input-problem"
                  ></textarea>
                  <span
                    class="add-or-remove-click"
                    @click.prevent="addInputProblem"
                  >
                    <svg
                      t="1600088454811"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="1152"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M512 70.283c-244.514 0-442.732 197.763-442.732 441.717s198.218 441.717 442.732 441.717 442.732-197.763 442.732-441.717-198.218-441.717-442.732-441.717M735.045 558.604h-176.442v176.442c0 25.738-20.866 46.604-46.604 46.604s-46.604-20.866-46.604-46.604v-176.442h-176.442c-25.738 0-46.604-20.866-46.604-46.604s20.866-46.604 46.604-46.604h176.442v-176.442c0-25.738 20.866-46.604 46.604-46.604s46.604 20.866 46.604 46.604v176.442h176.442c25.738 0 46.604 20.866 46.604 46.604s-20.866 46.604-46.604 46.604z"
                        fill="#ffffff"
                        p-id="1153"
                      ></path>
                    </svg>
                  </span>
                  <span
                    class="add-or-remove-click"
                    @click.prevent="removeInputProblem(index)"
                  >
                    <svg
                      t="1600088525141"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2189"
                      width="32"
                      height="32"
                    >
                      <path
                        d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z"
                        p-id="2190"
                        fill="#ffffff"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <hr />
        </template>

        <div class="hcpc-input-button">
          <label>
            <button
              type="commit"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              添加问题到&nbsp;=>&nbsp;{{ projectName }}
            </button>
          </label>
          <p style="color: red" v-show="showOrHiddenErrorMsg">{{ errorMsg }}</p>
          <br /><br />
          <p style="color: gray">
            添加的问题未提交时将自动保存到本地，下次进入时自动读取
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
          <table border="1">
            <thead>
              <tr>
                <th>终端</th>
                <th>页面</th>
                <th>问题详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(obj, index) in problemList" :key="index">
                <td>
                  <template
                    v-for="(dev, index) in obj?.devicesList"
                    :key="index"
                  >
                    <span v-if="obj.problemChooseDeviceId === dev?.id">
                      {{ dev?.systemDevicesName }}
                    </span>
                  </template>
                </td>
                <td>
                  <span>{{ obj.problemModulePage }}</span>
                </td>
                <td>
                  <span>{{ obj.problemContent }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            不提交
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="clickCommitTrue"
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
import Axios from "axios";
import $ from "jquery";
import FuncCommon from "../constants/FuncCommon";
import ConstWeb from "../constants/ConstWeb";
import mainJs from "@/main";

export default {
  name: "HomeAddProblemToProjectComponent",
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

    //判断本地保存的问题列表 没有的话重新请求服务器查询
    const localList = JSON.parse(
      window.localStorage.getItem(
        ConstWeb.STORAGE_KEY.KEY_SAVE_UNSUBMITTED_PROBLEM_OBJ
      )
    );
    if (localList === null || localList === "" || localList.length === 0) {
      this.querySystemDevicesList();
    } else {
      this.problemList = localList;
    }
  },
  methods: {
    clickCommit() {
      //window.localStorage.setItem(ConstWeb.STORAGE_KEY.KEY_SAVE_UNSUBMITTED_PROBLEM_LIST,JSON.stringify(""))
      return false;
    },
    clickCommitTrue() {
      Axios(
        {
          url: ConstWeb.WebApi.SAVE_PROJECT_SAVE_PROBLEM_LIST,
          data: this.problemList,
          method: "POST",
          headers: {
            token: FuncCommon.getStorageLoginInfo()?.token,
            "Content-Type": "application/json"
          }
        },
        { withCredentials: true }
      )
        .then(data => {
          if (data.data.code === ConstWeb.RESULT_CODE.RESULT_CODE_NOT_LOGIN) {
            mainJs.vue.$router.push("/login");
          } else {
            FuncCommon.showConsoleInfo(data);
            if (data.data.code === ConstWeb.RESULT_CODE.RESULT_CODE_SUCCESS) {
              window.localStorage.setItem(
                ConstWeb.STORAGE_KEY.KEY_SAVE_UNSUBMITTED_PROBLEM_OBJ,
                JSON.stringify("")
              );
              //刷新
              window.location.reload();
            }
          }
        })
        .catch(err => {
          FuncCommon.showConsoleError(err);
        });
    },
    querySystemDevicesList() {
      // 查询添加问题时选择的设备列表
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROJECT_SYSTEM_DEVICES,
        {},
        data => {
          const proD = new ProblemData();
          proD.devicesList = data.data.data;
          proD.projectId = this.projectId;
          this.problemList.push(proD);

          FuncCommon.showConsoleInfo(this.problemList);
        },
        error => {
          FuncCommon.showConsoleError(error);
        }
      );
    },
    addInputProblem() {
      //添加一行输入框
      const proD4 = new ProblemData();
      proD4.devicesList = this.problemList[0]?.devicesList;
      proD4.projectId = this.projectId;
      this.problemList.push(proD4);
    },
    removeInputProblem(index) {
      //移除一行输入框
      if (this.problemList.length > 1) {
        this.problemList.splice(index, 1);
        FuncCommon.showConsoleInfo(this.problemList);
      }
    },
    clickSaveUnSubmittedProblemToLocal() {
      window.localStorage.setItem(
        ConstWeb.STORAGE_KEY.KEY_SAVE_UNSUBMITTED_PROBLEM_OBJ,
        JSON.stringify(this.problemList)
      );
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

class ProblemData {
  devicesList = [];
  problemChooseDeviceId = "";
  problemModulePage = "";
  problemContent = "";
  projectId = "";
}
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
  height: 42px;
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
.add-or-remove-click {
  margin: auto 0 auto 14px;
}
.add-or-remove-click:hover {
  cursor: pointer;
}
.item-title {
  color: wheat;
}

table {
  width: 100%;
}
</style>
