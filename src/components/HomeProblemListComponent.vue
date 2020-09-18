<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li
          :class="[
            'label-li',
            { 'label-li-active': chooseProjectId === 'new' }
          ]"
          @click="chooseTopProjectLabel('new')"
        >
          最新
        </li>
        <li
          :class="[
            'label-li',
            { 'label-li-active': chooseProjectId === obj?.id }
          ]"
          v-for="(obj, index) in projectLabelList"
          :key="index"
          @click="chooseTopProjectLabel(obj?.id)"
        >
          {{ obj?.projectName }}
        </li>
      </ul>
    </div>

    <hr />

    <div class="hmc-item-content" id="setHeight">
      <transition-group name="list" tag="div">
        <ItemProblem
          v-for="(obj, index) in problemList"
          :key="index"
          :problem-o="obj"
        />
      </transition-group>
      <div style="margin: 40px auto 40px auto" v-if="isShowLoading">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
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
import ItemProblem from "../components/hmc/ItemProblem";

export default {
  name: "HomeProblemListComponent",
  components: { ItemProblem },
  data() {
    return {
      projectLabelList: [], // 顶部项目标签
      problemList: [],
      chooseProjectId: "new", //选中的某个标签
      pagination: Object,
      isShowLoading: false, //是否显示 加载圈
      loadPageCountSize: 10, //每次加载多少条数据
      loadCurPage: 1 //加载数据的当前页
    };
  },
  created() {},
  mounted() {
    this.onscrollS();
    this.queryProjectLabelList();
  },
  methods: {
    onscrollS() {
      const _that = this;
      $("#setHeight").height(document.body.clientHeight - 130);
      window.onresize = () => {
        return (() => {
          console.info(
            document.body.clientWidth + "==" + document.body.clientHeight
          );
          $("#setHeight").height(document.body.clientHeight - 130);
        })();
      };
      //容器div滚动事件
      $("#setHeight").scroll(function() {
        const h = $(this).height();
        const sh = $(this)[0].scrollHeight;
        const st = $(this)[0].scrollTop;
        if (h + st >= sh) {
          if (_that.pagination?.curPage < _that.pagination?.totalPage) {
            //如果当前页小于等于总页数 则加载下一页的数据
            _that.loadCurPage = _that.pagination?.curPage + 1;
            const timer = setInterval(() => {
              clearInterval(timer);
              _that.queryProjectProblemList();
            }, 1000);
            FuncCommon.showConsoleInfo("加载下一页，页码：");
            FuncCommon.showConsoleInfo(_that.loadCurPage);
          }
        }
      });
    },
    chooseTopProjectLabel(selId) { // 标签点击事件/查询项目的问题列表
      this.chooseProjectId = selId;
      if (this.chooseProjectId === "new") {
        this.problemList = [];
        this.queryNewProjectProblemListCount(); //如果点击的标签是最新，则查询推荐的
      } else {
        this.pagination = null;
        this.loadCurPage = 1;
        this.problemList = [];
        this.queryProjectProblemList(); //如果点击的标签是项目，则查询当前点击的项目id
      }
    },
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
      const _that = this;
      // 根据项目id查询问题列表
      const params = new URLSearchParams();
      params.append("projectId", this.chooseProjectId);
      params.append("page", this.loadCurPage);
      params.append("pageCountSize", this.loadPageCountSize);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROBLEM_LIST_BY_PROJECT_ID,
        params,
        data => {
          if (data.data?.code === ConstWeb.RESULT_CODE.RESULT_CODE_SUCCESS) {
            FuncCommon.showConsoleInfo("根据项目id查询问题列表:");
            FuncCommon.showConsoleInfo(data);
            const ds = data.data?.data;
            //分页数据
            _that.pagination = data.data.pagination;
            if (_that.pagination?.curPage === _that.pagination?.totalPage) {
              //当前页等于总页数，没有数据了
              _that.isShowLoading = false;
            } else {
              _that.isShowLoading = true;
            }

            //放数据
            if (_that.pagination?.curPage === 1) {
              FuncCommon.showConsoleInfo("CUR_PAGE=1");
              _that.problemList = ds;
            } else {
              FuncCommon.showConsoleInfo("CUR_PAGE!=1");
              for (let index in ds) {
                _that.problemList?.push(ds[index]);
              }
              _that.$forceUpdate();
            }
          } else {
            FuncCommon.showConsoleInfo("根据项目id查询问题列表:");
            FuncCommon.showConsoleInfo(data);
          }
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
          this.problemList = data.data?.data;
          this.isShowLoading = false;
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

.label-li {
  display: inline;
  border: 1px #696969 solid;
  margin: auto 12px;
  border-radius: 16px;
  padding: 4px 10px 4px 10px;
  font-size: 0.8rem;
  color: #696969;
  box-shadow: 0 0 4px #202020;
}
.label-li-active {
  display: inline;
  border: 1px #ffc107 solid;
  margin: auto 12px;
  border-radius: 16px;
  padding: 4px 10px 4px 10px;
  font-size: 0.8rem;
  color: #ffc107;
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

/** 插入过程 **/
.list-enter-active {
  transition: all 1s;
}
/** 移除过程 **/
.list-leave-active {
  transition: all 1s;
}
/*** 开始插入、移除结束的位置变化 ***/
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
