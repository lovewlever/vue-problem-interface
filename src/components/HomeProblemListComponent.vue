<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li>最新</li>
        <li v-for="(obj, index) in projectLabelList" :key="index">
          {{ obj?.projectName }}
        </li>
      </ul>
    </div>

    <hr />

    <div class="hmc-item-content" id="setHeight">
      <ItemProblem
        v-for="(obj, index) in problemList"
        :key="index"
        :problem-obj="obj"
      />

      <div style="left: 50%;margin: 24px 0">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
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
import ItemProblem from "@/components/hmc/ItemProblem";

export default {
  name: "HomeProblemListComponent",
  components: { ItemProblem },
  data() {
    return {
      projectLabelList: [], // 顶部项目标签
      problemList: []
    };
  },
  created() {},
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 130);
    window.onresize = () => {
      return (() => {
        FuncCommon.showConsoleInfo(
          document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 130);
      })();
    };

    this.queryProjectLabelList();
  },
  methods: {
    queryProjectLabelList() {
      // 查询顶部项目标签
      const urlParams = new URLSearchParams();
      urlParams.append("labelNum", 10);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_RECOMMEND_PROJECT_LABEL_FOR_PROBLEM,
        urlParams,
        data => {
          FuncCommon.showConsoleInfo(data);
          this.projectLabelList = data.data.data;

          this.queryProjectProblemList();
          this.queryNewProjectProblemListCount();
        },
        error => {
          FuncCommon.showConsoleError(error);
        }
      );
    },
    queryProjectProblemList() {
      // 根据项目id查询问题列表
      const params = new URLSearchParams();
      params.append("projectId", "d7be22b08dcb4531be3d6ea9f686c394");
      params.append("page", 1);
      params.append("pageCountSize", 30);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROBLEM_LIST_BY_PROJECT_ID,
        params,
        data => {
          FuncCommon.showConsoleInfo("根据项目id查询问题列表:");
          FuncCommon.showConsoleInfo(data);
        },
        err => {
          FuncCommon.showConsoleError("根据项目id查询问题列表:");
          FuncCommon.showConsoleError(err);
        }
      );
    },
    queryNewProjectProblemListCount() {
      // 查询最新添加的指定条问题
      const params = new URLSearchParams();
      params.append("pageCountSize", 30);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROBLEM_LIST_NEW_TIME_COUNT,
        params,
        data => {
          FuncCommon.showConsoleInfo("查询最新添加的指定条问题:");
          FuncCommon.showConsoleInfo(data);
          this.problemList = data.data.data;
        },
        err => {
          FuncCommon.showConsoleError("查询最新添加的指定条问题:");
          FuncCommon.showConsoleError(err);
        }
      );
    }
  }
};
</script>

<style scoped>
hr {
  background: #383838;
}
.hmc-top-label {
  list-style-type: none;
  text-align: left;
  margin: 3px 0 13px 0;
}
.hmc-top-label li {
  display: inline;
  border: 1px #696969 solid;
  margin: auto 12px;
  border-radius: 16px;
  padding: 4px 10px 4px 10px;
  font-size: 0.8rem;
  color: #696969;
  box-shadow: 0 0 4px #202020;
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

.page-item {
  display: inline-block;
}
.page-item a {
  background: #202020;
  border-color: #383838;
}
.pagination {
  text-align: center;
  display: inline-block;
  margin: 0;
}
</style>
