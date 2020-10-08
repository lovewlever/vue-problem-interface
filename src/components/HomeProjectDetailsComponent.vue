<template>
  <div>
    <div style="display: flex">
      <ul class="hmc-top-label">
        <li><q>{{ projectObj?.projectName }}</q>&nbsp;@{{ projectObj?.tuserEntity?.unickname }}</li>
      </ul>

      <ul class="hpdc-top-add">
        <li @click="clickToAddProblemToProject">
          <span>添加问题</span>
        </li>
        <li @click="clickExportProblemDoc">
          <span>导出问题文档(TXT)</span>
        </li>
        <li style="background: none;border: none;"><span>|</span></li>

        <li @click="clickToAddInterfaceToProject">
          <span>添加接口</span>
        </li>
        <li @click="clickExportInterfaceDoc">
          <span>导出接口文档(Excel)</span>
        </li>
      </ul>
    </div>
    <hr/>
    <br/>
    <div class="hmc-item-content" id="setHeight">
      <template v-for="(obj,index) in operateRecorders" :key="index">
        <!--操作记录-->
        <div style="margin-left: 24px;text-align: left">
          <div style="border-left: 1px red solid;height: 40px"></div>
          <div style="display: flex">
                  <span style="margin: auto 0;width: 30px">
                      <svg style="margin: 0 0 0 -5px" width="1em" height="1em" viewBox="0 0 16 16"
                           class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                      </svg>
                  </span>
            <div>
              <p style="margin: 0;color: #B9B8B8">
                {{ obj?.tporOperateType }}&{{ obj?.tporOperateContent }}&nbsp;&nbsp;<span>&nbsp;@{{ obj?.refTUserEntity?.unickname }}</span>
              </p>
              <hr style="margin: 8px 0"/>
              <p style="margin: 0;color: #7D7D7D">
                {{ obj?.tporOperateType }}<span>&nbsp;&nbsp;{{ formatDate(obj?.tporTimestamp) }}</span>
              </p>
            </div>
          </div>
          <div style="border-left: 1px red solid;height: 40px"></div>
        </div>
      </template>
    </div>

    <!--导出文档弹出框-->
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <template v-if="exportType === 'problem'">导出问题文档（TXT）</template>
              <template v-if="exportType === 'interface'">导出接口文档</template>
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
            <template v-if="exportType === 'problem'">
              <div class="export-btn-group">
                <button type="button" class="btn btn-outline-success" @click="requestExportProblem('all')">全部</button>
                <button type="button" class="btn btn-outline-danger" @click="requestExportProblem('undone')">未完成</button>
                <button type="button" class="btn btn-outline-warning" @click="requestExportProblem('complete')">已完成</button>
              </div>
            </template>
            <template v-if="exportType === 'interface'">
              <div class="export-btn-group">
                <button type="button" class="btn btn-outline-success">全部(Excel)</button>
                <button type="button" class="btn btn-outline-danger">未完成(Excel)</button>
                <button type="button" class="btn btn-outline-warning">已完成(Excel)</button>
              </div>
              <div class="export-btn-group" style="margin: 12px 0">
                <button type="button" class="btn btn-outline-success">全部(Word)</button>
                <button type="button" class="btn btn-outline-danger">未完成(Word)</button>
                <button type="button" class="btn btn-outline-warning">已完成(Word)</button>
              </div>
            </template>
          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
              取消
            </button>
            <button id="dialogCommit" type="button" class="btn btn-primary" data-dismiss="modal">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import $ from "jquery";
import ConstWeb from "../constants/ConstWeb";
import FuncCommon from "../constants/FuncCommon";
import {formatDate2} from "@/constants/Filter";

export default {
  name: "HomeProjectDetailsComponent",
  data() {
    return {
      projectObj: null,
      operateRecorders: [],
      projectId: String,
      exportType: "problem"
    };
  },
  components: {},
  created() {
    this.projectId = this.$route.query.projectId
    this.queryProjectDetails()
  },
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 180);
    window.onresize = () => {
      return (() => {
        FuncCommon.showConsoleInfo(
            document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 180);
      })();
    };
  },
  methods: {
    //查询项目详情
    queryProjectDetails() {
      const _this = this
      const urlParams = new URLSearchParams()
      urlParams.append("projectId", _this.projectId);
      ConstWeb.axiosRequest(ConstWeb.WebApi.QUERY_PROJECT_DETAILS, urlParams, data => {
        FuncCommon.showConsoleInfo(data)
        this.projectObj = data.data.data[0]
        //查询项目的操作记录
        this.queryProjectOperateRecorders();
      }, err => {
        FuncCommon.showConsoleError(err)
      })
    },
    // 查询项目的操作记录
    queryProjectOperateRecorders() {
      const _this = this
      FuncCommon.showConsoleInfo("查询项目的操作记录")
      const urlParams = new URLSearchParams()
      urlParams.append("projectId", _this.projectId);
      urlParams.append("page", 1);
      urlParams.append("pageCountSize", 30);
      ConstWeb.axiosRequest(ConstWeb.WebApi.QUERY_PROJECT_OPERATE_RECORDER, urlParams, data => {
        FuncCommon.showConsoleInfo(data)
        this.operateRecorders = data.data.data
      }, err => {
        FuncCommon.showConsoleError(err)
      })
    },
    //添加问题
    clickToAddProblemToProject() {
      const _this = this
      this.$router.push({
        path: "/homeAddProblemToProjectComponent", query:
            {
              projectId: _this.projectId,
              projectName: _this.projectObj?.projectName
            }
      })
    },
    //添加接口
    clickToAddInterfaceToProject() {
      const _this = this
      this.$router.push({
        path: "/homeInterfaceAddOrEditAndDetailsComponent", query: {
          projectId: _this.projectId,
          projectName: _this.projectObj?.projectName
        }
      })
    },
    formatDate(time) {
      if (time !== undefined) {
        const data = new Date(time);
        return formatDate2(data, 'yyyy-MM-dd HH:mm:ss');
      } else {
        return "--"
      }
    },
    //导出问题文档
    clickExportProblemDoc() {
      this.exportType = "problem";
      $("#exampleModal").modal();
    },
    //导出接口文档
    clickExportInterfaceDoc() {
      this.exportType = "interface";
      $("#exampleModal").modal();
    },
    requestExportProblem(type) {
      window.open(ConstWeb.WebApi.EXPORT_PROBLEM_DOC
          + "?type=" + type
          + "&fileId=" + FuncCommon.getStorageLoginInfo().id
          + "&projectId=" + this.projectId, "_blank");
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

label {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.hpdc-top-add {
  flex: 1;
  list-style-type: none;
  text-align: right;
  margin: 3px 0 13px 0px;
  display: flex;
}

.hpdc-top-add li {
  display: inline;
  margin: auto 0 auto 24px;
  padding: 3px 10px 0px 10px;
  font-size: 0.8rem;
  height: 26px;
  color: #696969;
  border: 1px solid;
  border-radius: 6px;
}

.hpdc-top-add li:hover {
  cursor: pointer;
}

.hpdc-top-add li a {
  color: #696969;
}
.export-btn-group button {
  margin: 0 6px;
}
</style>
