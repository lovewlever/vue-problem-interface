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
      <ItemProject :double-data-list="datas" />

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
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeMineComponent",
  components: { ItemProject },
  data() {
    return {
      datas: []
    }
  },
  created() {
  },
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 101);
    window.onresize = () => {
      return (() => {
        console.info(
          document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 101);
      })();
    };
    FuncCommon.getStorageLoginInfo()
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
