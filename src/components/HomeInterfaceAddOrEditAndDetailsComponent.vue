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
      <div class="hmc-item-content" id="setHeight" style="text-align: left">
        <div style="margin: auto 60px;flex: 1">
          <!--操作区-->
          <div>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-success dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                操作
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </div>

            <div class="btn-group" style="margin: 0 0 0 24px">
              <button
                type="button"
                class="btn btn-success dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                评分
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">1</a>
                <a class="dropdown-item" href="#">2</a>
                <a class="dropdown-item" href="#">3</a>
                <a class="dropdown-item" href="#">4</a>
                <a class="dropdown-item" href="#">5</a>
                <a class="dropdown-item" href="#">6</a>
                <a class="dropdown-item" href="#">7</a>
                <a class="dropdown-item" href="#">8</a>
                <a class="dropdown-item" href="#">9</a>
                <a class="dropdown-item" href="#">10</a>
              </div>
            </div>
          </div>
          <br /><br />
          <!--输入-->
          <div style="width: 100%;display: flex">
            <!--选择请求类型 输入请求连接-->
            <div class="request-input-content">
              <!--选择请求类型-->
              <div class="dropdown" style="height: 100%;">
                <label style="height: 100%">
                  <select
                    name="get"
                    class="request-input-content-select"
                    v-model="requestAllParams.requestType"
                  >
                    <option
                      label="GET"
                      value="get"
                      :selected="requestAllParams?.requestType === 'get'"
                    ></option>
                    <option
                      label="POST"
                      value="post"
                      :selected="requestAllParams?.requestType === 'post'"
                    ></option>
                    <option
                      label="PUT"
                      value="put"
                      :selected="requestAllParams?.requestType === 'put'"
                    ></option>
                    <option
                      label="DELETE"
                      value="delete"
                      :selected="requestAllParams?.requestType === 'delete'"
                    ></option>
                  </select>
                </label>
              </div>
              <!--URL输入-->
              <div class="request-input-content-url">
                <label>
                  <input
                          id="inputUrlId"
                    type="text"
                    placeholder="https://"
                    :value="requestAllParams.requestUrl"
                          @change.prevent="urlInputChange"
                  />
                </label>
              </div>
            </div>
            <!--发送请求-->
            <button type="button" class="btn btn-success btn-send-request">
              发送请求
            </button>
          </div>
          <br />
          <p>参数</p>
          <!--hr-->
          <hr />



          <!--参数-->
          <div style="width: 100%;margin-top: 14px">
            <table>
              <thead>
                <tr>
                  <th>选择</th>
                  <th>参数</th>
                  <th>值</th>
                  <th>注释</th>
                  <th style="text-align:center">操作</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="(item, index) in requestAllParams?.params"
                  :key="index"
                >
                  <tr>
                    <td  class="table-select-td">
                      <input type="checkbox" v-model="item.checked" style="margin-left: 8px"/>
                    </td>
                    <td class="table-params-td">
                      <input
                        type="text"
                        v-model="item.key"
                        class="params-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="item.value"
                        class="params-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="item.description"
                        class="params-input"
                      />
                    </td>
                    <td class="operating-td">
                      <span
                        class="add-or-remove-click"
                        @click.prevent="addParamsForParams()"
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
                        @click.prevent="removeParamsForParams(index)"
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
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <br />
          <p>Headers</p>
          <!--hr-->
          <hr />


          <!--Headers-->
          <div style="width: 100%;margin-top: 14px">
            <table>
              <thead>
                <tr>
                  <th>选择</th>
                  <th>参数</th>
                  <th>值</th>
                  <th>注释</th>
                  <th style="text-align:center">操作</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="(item, index) in requestAllParams?.headers"
                  :key="index"
                >
                  <tr>
                    <td class="table-select-td">
                      <input type="checkbox" v-model="item.checked" style="margin-left: 8px" />
                    </td>
                    <td class="table-params-td">
                      <input
                        type="text"
                        v-model="item.key"
                        class="params-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="item.value"
                        class="params-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        v-model="item.description"
                        class="params-input"
                      />
                    </td>
                    <td class="operating-td">
                      <span
                        class="add-or-remove-click"
                        @click.prevent="addParamsForHeaders()"
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
                        @click.prevent="removeParamsForHeaders(index)"
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
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <br />
          <p>返回值</p>
          <!--hr-->
          <hr />
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
            添加接口到&nbsp;=>&nbsp;{{ projectName }}
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
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            不提交
          </button>
          <button type="button" class="btn btn-primary">
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
  name: "HomeInterfaceAddOrEditAndDetailsComponent",
  data() {
    return {
      requestAllParams: RequestParams,
      projectId: String,
      projectName: String,
      errorMsg: "",
      showOrHiddenErrorMsg: false,
      isParse: false
    };
  },
  components: {},
  created() {
    this.projectId = this.$route.query.projectId;
    this.projectName = this.$route.query.projectName;
    FuncCommon.showConsoleInfo(this.projectId);
    //生成默认的参数列表
    const params = new ParamsAndHeaders();
    const headers = new ParamsAndHeaders();
    const paramArr = [];
    const headersArr = [];
    paramArr.push(params);
    headersArr.push(headers);
    const req = new RequestParams();
    req.params = paramArr;
    req.headers = headersArr;
    this.requestAllParams = req;
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
    },
      //添加一行参数输入
      addParamsForParams() {
        this.requestAllParams.params.push(new ParamsAndHeaders())
      },
    //移除一行输入参数
      removeParamsForParams(index) {
        if (this.requestAllParams.params.length > 1) {
          this.requestAllParams.params.splice(index, 1);
          FuncCommon.showConsoleInfo(this.requestAllParams.params);
        }
      },
    //添加一行Headers输入框
    addParamsForHeaders() {
      this.requestAllParams.headers.push(new ParamsAndHeaders())
    },
    //移除一行Headers输入框
    removeParamsForHeaders(index){
      if (this.requestAllParams.headers.length > 1) {
        this.requestAllParams.headers.splice(index, 1);
        FuncCommon.showConsoleInfo(this.requestAllParams.headers);
      }
    },
    //URL输入框改变事件
    urlInputChange() {
      const $inputUrlId = $("#inputUrlId");
      this.requestAllParams.requestUrl = $inputUrlId.val();
      let inputUrl = this.requestAllParams.requestUrl;
      if (inputUrl.indexOf("?") !== -1) {
        let urlParams = inputUrl.substring(inputUrl.indexOf("?") + 1,inputUrl.length);
        let kDv = urlParams.split("&");
        FuncCommon.showConsoleInfo(kDv);
        FuncCommon.showConsoleInfo(urlParams);
        let paramsArr = [];
        for (let pos in kDv) {
          let kv = kDv[pos].split("=");
          let pah = new ParamsAndHeaders();
          pah.key = kv[0];
          pah.value = kv[1];
          paramsArr.push(pah);
        }
        FuncCommon.showConsoleInfo(paramsArr);
        this.requestAllParams.params = paramsArr;
      }
    }
  },
  computed: {
  },
  watch: {
    requestAllParams: {
      handler(newVal,oleVal) {
        FuncCommon.showConsoleInfo(newVal + oleVal);
        const params = newVal.params;
        FuncCommon.showConsoleInfo(params.length);
        let urlParams = "?";
        for (let index in params) {
          if (params[index].checked) {
            if (index === "0") {
              urlParams += ("" + params[index].key + "=" + params[index].value)
            } else {
              urlParams += ("&" + params[index].key + "=" + params[index].value)
            }
          }
        }
        if (urlParams === "?=") {
          urlParams = "";
        }
        let url = this.requestAllParams.requestUrl;
        FuncCommon.showConsoleInfo(url);
        if (url.indexOf("?") !== -1) {
          url = url.substring(0, url.indexOf("?"));
        }
        this.requestAllParams.requestUrl = url + urlParams;
        FuncCommon.showConsoleInfo(urlParams);
      },
      deep:true
    }
  }
};

class RequestParams {
  requestType = "get";
  requestUrl = "https://";
  params = [ParamsAndHeaders];
  headers = [ParamsAndHeaders];
}

class ParamsAndHeaders {
  key = "";
  value = "";
  description = "";
  checked = true;
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

.request-input-content {
  margin: auto 0;
  display: flex;
  flex: 1;
  background: #202020;
  height: 38px;
    border: 1px #616061 solid;
}

.request-input-content-select {
  background: none;
  color: white;
  height: 100%;
  outline: none;
  border: none;
    background: #202020;
    padding: 0 6px;
    border-right: 1px #616061 solid;
}

.request-input-content-url {
  flex: 1;
  margin: auto 0;
  height: 100%;
    padding: 0 6px;
}

.request-input-content-url label {
  width: 100%;
  margin: auto;
  height: 100%;
}

.request-input-content-url label input {
  width: 100%;
  height: 100%;
    background: none;
  outline: none;
  border: none;
    color: white;
}

.btn-send-request {
  margin: auto 0 auto 16px;
}

.table-params-td {
    width: 180px;
}
.table-select-td {
    width: 50px;
}

.params-input {
  background: #202020;
  height: 40px;
  border-radius: 1px;
  outline: none;
  color: wheat;
    width: 100%;
    border: 1px #616061 solid;
    padding: 0 8px;
}

thead tr th {
    color: gray;
}

.add-or-remove-click {
    margin: auto 0 auto 0;
    padding: 4px;
}
.add-or-remove-click:hover {
    cursor: pointer;
}
    .operating-td {
        width: 84px;
        text-align: center;
    }
</style>
