<template>
  <div>
    <div style="display: flex;">
      <ul id="labelUl" class="hmc-top-label" style="width: 900px;overflow-x: scroll;overflow-y: hidden;white-space: nowrap" @mousewheel="mouseWheel" >
        <li v-if="historyClickProjectLabel"
            :class="[ 'label-li', { 'label-li-active': chooseProjectId === historyClickProjectLabel?.projectId } ]"
            @click="chooseTopProjectLabel(historyClickProjectLabel?.projectId,historyClickProjectLabel?.projectName)">
          {{ historyClickProjectLabel?.projectName }}
        </li>
        <!--上方为上次点击的项目 分割线-->
        <li class="label-li" style="border: none;margin: auto 0;padding: 0">
          <span>|</span>
        </li>
        <li :class="[ 'label-li', { 'label-li-active': chooseProjectId === obj?.id } ]"
          v-for="(obj, index) in projectLabelList" :key="index" @click="chooseTopProjectLabel(obj?.id,obj?.projectName)" >
          {{ obj?.projectName }}
        </li>
      </ul>

      <div style="margin: 3px 0 auto 8px">
        <svg t="1600500349301" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4405" width="32" height="32"><path d="M292.571429 365.714286v292.571428a280.454095 280.454095 0 0 0 194.681904 266.971429A292.449524 292.449524 0 0 1 219.428571 633.904762V390.095238A292.449524 292.449524 0 0 1 487.253333 98.742857 280.454095 280.454095 0 0 0 292.571429 365.714286z" fill="#504BFF" opacity=".1" p-id="4406"></path><path d="M512 999.619048a341.333333 341.333333 0 0 1-341.333333-341.333334V365.714286a341.333333 341.333333 0 0 1 682.666666 0v292.571428a341.333333 341.333333 0 0 1-341.333333 341.333334z m268.190476-633.904762a268.190476 268.190476 0 0 0-536.380952 0v292.571428a268.190476 268.190476 0 0 0 536.380952 0V365.714286z" fill="#504BFF" p-id="4407"></path><path d="M512 560.761905a97.52381 97.52381 0 0 1-97.52381-97.52381V341.333333a97.52381 97.52381 0 0 1 195.04762 0v121.904762a97.52381 97.52381 0 0 1-97.52381 97.52381z m24.380952-219.428572a24.380952 24.380952 0 0 0-48.761904 0v121.904762a24.380952 24.380952 0 0 0 48.761904 0V341.333333z" fill="#F469FD" p-id="4408"></path></svg>
      </div>

      <template
        v-if="
          projectLabelPagination?.curPage < projectLabelPagination?.totalPage
        "
      >
        <!--分页查询全部项目标签时 如果还有下一页 则显示此按钮-->
        <div class="label-load-more" @click="loadMoreProjectLabels()">
          <span>More&nbsp;></span>
        </div>
      </template>
    </div>
    <hr />

    <div class="hmc-item-content" id="setHeight">
      <transition-group name="list" tag="div">
        <ItemInterface
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
import ItemInterface from "../components/hmc/ItemInterface";

export default {
  name: "HomeInterfaceListComponent",
  components: { ItemInterface },
  data() {
    return {
      projectLabelList: [], //顶部标签（全部项目 分页查询）
      historyClickProjectLabel: null, //存在本地的上次点击的标签
      problemList: [],
      chooseProjectId: "new", //选中的某个标签
      pagination: Object,
      projectLabelPagination: Object, // 顶部项目标签 分页数据
      loadLabelCurPage: 1, // 加载标签的当前页
      isShowLoading: false, //是否显示 加载圈
      loadPageCountSize: 10, //每次加载多少条数据
      loadCurPage: 1, //加载数据的当前页
      isLoadingNow: false //是否正在加载数据，
    };
  },
  beforeCreate() {
    document.title = "INTERFACE";
  },
  created() {},
  mounted() {
    this.onscrollS();
    this.queryProjectAllLabelListByPagination();

    //查询上次点击的历史项目并查询项目下的接口
    this.historyClickProjectLabel = JSON.parse(window.localStorage.getItem(ConstWeb.STORAGE_KEY.KEY_HISTORY_CLICK_PROJECT_LABEL_FOR_INTERFACE));
    if (this.historyClickProjectLabel !== null) {
      this.chooseProjectId = this.historyClickProjectLabel.projectId;
      this.queryProjectInterfaceListById();
    }
  },
  methods: {
    mouseWheel(event) {
      const detail = event.wheelDelta || event.detail;
      const moveForwardStep = 1;
      const moveBackStep = -1;
      let step = 0;
      if(detail < 0){
        step = moveForwardStep*100;
      } else {
        step = moveBackStep * 100;
      }

      $("#labelUl")[0].scrollLeft += step;
    },
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
            if (this.isLoadingNow) return; //如果正在请求数据，等待请求完成后再继续下一次请求
            _that.loadCurPage = _that.pagination?.curPage + 1;
            const timer = setInterval(() => {
              clearInterval(timer);
              _that.queryProjectInterfaceListById();
            }, 1000);
            FuncCommon.showConsoleInfo("加载下一页，页码：");
            FuncCommon.showConsoleInfo(_that.loadCurPage);
          }
        }
      });
    },
    // 标签点击事件/查询项目的接口列表
    chooseTopProjectLabel(selId,pName) {
      this.chooseProjectId = selId;
      this.pagination = null;
      this.loadCurPage = 1;
      this.problemList = [];
      //把点击的标签存在本地
      this.historyClickProjectLabel = {
        projectName: pName,
        projectId: selId
      };
      window.localStorage.setItem(ConstWeb.STORAGE_KEY.KEY_HISTORY_CLICK_PROJECT_LABEL_FOR_INTERFACE,JSON.stringify(this.historyClickProjectLabel))
      this.queryProjectInterfaceListById(); //如果点击的标签是项目，则查询当前点击的项目id
    },
    //加载更多项目标签
    loadMoreProjectLabels() {
      FuncCommon.showConsoleInfo("加载更多项目标签：");
      FuncCommon.showConsoleInfo(this.projectLabelPagination);
      if (
        this.projectLabelPagination?.curPage <
        this.projectLabelPagination?.totalPage
      ) {
        FuncCommon.showConsoleInfo("加载更多项目标签：");
        this.loadLabelCurPage = this.projectLabelPagination?.curPage + 1;
        this.queryProjectAllLabelListByPagination();
      }
    },
    // 查询顶部全部项目标签（分页）
    queryProjectAllLabelListByPagination() {
      this.isLoadingNow = true;
      const urlParams = new URLSearchParams();
      urlParams.append("page", this.loadLabelCurPage);
      urlParams.append("pageCountSize", 10);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROJECT_LABEL_FOR_PROBLEM_BY_PAGINATION,
        urlParams,
        data => {
          FuncCommon.showConsoleInfo(data);
          const lPagE = data.data?.pagination;
          const lList = data.data?.data;
          if (lPagE?.curPage === 1) {
            this.projectLabelList = lList;
          } else {
            for (let index in lList) {
              this.projectLabelList.push(lList[index]);
            }
          }
          if (lPagE?.curPage !== 1) {
            const tim = setInterval(() => {
              $("#labelUl")[0].scrollLeft += 1000;
              clearInterval(tim);
            }, 500);
          }
          this.projectLabelPagination = lPagE;
          this.isLoadingNow = false;
        },
        error => {
          FuncCommon.showConsoleError(error);
          this.isLoadingNow = false;
        }
      );
    },
    // 根据项目id查询接口列表
    queryProjectInterfaceListById() {
      const _that = this;
      const params = new URLSearchParams();
      params.append("projectId", this.chooseProjectId);
      params.append("page", this.loadCurPage);
      params.append("pageCountSize", this.loadPageCountSize);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_INTERFACES_BY_PROJECT_ID,
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

            //数据为空，隐藏加载条
            if (this.problemList.length === 0) {
              _that.isShowLoading = false;
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
  margin: 7px 0 0 0;
  padding-bottom: 2px;
}
.hmc-top-label::-webkit-scrollbar {
  display: none;
  background: #6f6f6f;
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

.label-load-more {
  display: inline;
  margin: auto auto auto 4px;
  padding: 8px 10px 6px 10px;
  font-size: 0.8rem;
  color: #696969;
  box-shadow: 0 0 4px #202020;
}
.label-load-more span {
  display: block;
  padding-top: 2px;
}

.hmc-top-label li,
.label-load-more:hover {
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
