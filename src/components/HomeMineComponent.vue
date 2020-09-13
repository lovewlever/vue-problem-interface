<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li>我添加的项目</li>
        <li>我添加的项目问题</li>
        <li>未修改完成的问题</li>
        <li>已修改的问题</li>
      </ul>
    </div>

    <div class="hmc-item-content" id="setHeight">
      <ItemProject v-for="(obj,index) in projectDataList" :key="index" :double-data-list="obj" />

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
import ItemProject from "@/components/hmc/ItemProject";
import $ from "jquery";
import ConstWeb from "../constants/ConstWeb";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeMineComponent",
  components: { ItemProject },
  data() {
    return {
      projectDataList: []
    }
  },
  created() {
  },
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 101);
    window.onresize = () => {
      return (() => {
        FuncCommon.showConsoleInfo(
          document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 101);
      })();
    };
    this.queryProjectList()
  },
  methods: {
    queryProjectList() { //查询我的项目
      const urlParams = new URLSearchParams();
      urlParams.append("page", 1);
      urlParams.append("pageCountSize", 10);
      ConstWeb.axiosRequest(
              ConstWeb.WebApi.QUERY_PROJECT_LIST_FOR_ME,
              urlParams,
              data => {
                FuncCommon.showConsoleInfo(data)
                let arr = [];
                const array = data.data.data;
                for (let index in array) {
                  FuncCommon.showConsoleInfo(index)
                  if (index % 2 === 0) { //偶数
                    arr.push(array[index]);
                    this.projectDataList.push(arr);
                  } else { //奇数
                    arr.push(array[index]);
                    arr = [];
                  }
                }
                FuncCommon.showConsoleInfo(this.projectDataList[0]);
              },
              error => {
                FuncCommon.showConsoleError(error);
              }
      );
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
