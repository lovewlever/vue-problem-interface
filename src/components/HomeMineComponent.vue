<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li
          :class="[
            'label-li',
            { 'label-li-active': chooseProjectLabelId === 'myAddProject' }
          ]"
          @click="chooseTopProjectLabel('myAddProject')"
        >
          我添加的项目
        </li>
        <li
          :class="[
            'label-li',
            {
              'label-li-active': chooseProjectLabelId === 'myNotFinishedProblem'
            }
          ]"
          @click="chooseTopProjectLabel('myNotFinishedProblem')"
        >
          已选择未完成的问题
        </li>
        <li
          :class="[
            'label-li',
            { 'label-li-active': chooseProjectLabelId === 'myFinishedProblem' }
          ]"
          @click="chooseTopProjectLabel('myFinishedProblem')"
        >
          已修改完成的问题
        </li>
      </ul>
    </div>

    <div class="hmc-item-content" id="setHeight">
      <transition-group name="list" tag="div">
        <ItemProject
          v-for="obj in projectDataList"
          :key="obj?.id"
          :double-data-list="obj"
        />
      </transition-group>

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
import ItemProject from "../components/hmc/ItemProject";
import ItemProblem from "../components/hmc/ItemProblem";
import $ from "jquery";
import ConstWeb from "../constants/ConstWeb";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeMineComponent",
  components: { ItemProject,ItemProblem },
  data() {
    return {
      projectDataList: [], //项目列表
      problemList: [], //问题列表
      chooseProjectLabelId: "myNotFinishedProblem", //选中的某个标签
      pagination: Object,
      isShowLoading: false, //是否显示 加载圈
      loadPageCountSize: 10, //每次加载多少条数据
      loadCurPage: 1, //加载数据的当前页
      isLoadingNow: false //是否正在加载数据
    };
  },
  beforeCreate() {
    document.title = "HOME";
  },
  created() {},
  mounted() {
    this.onscrollS();
    this.queryNotCompletedProblems("NotCompleted");
  },
  methods: {
    onscrollS() {
      const _that = this;
      $("#setHeight").height(document.body.clientHeight - 101);
      window.onresize = () => {
        return (() => {
          console.info(
            document.body.clientWidth + "==" + document.body.clientHeight
          );
          $("#setHeight").height(document.body.clientHeight - 101);
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
              if (_that.chooseProjectLabelId === "myAddProject") {
                _that.problemList = [];
                _that.queryProjectList();
              } else if ( _that.chooseProjectLabelId === "myNotFinishedProblem") {
                _that.projectDataList = [];
                _that.queryNotCompletedProblems("NotCompleted");
              } else if ( _that.chooseProjectLabelId === "myFinishedProblem") {
                _that.projectDataList = [];
                _that.queryNotCompletedProblems("Completed");
              }
              clearInterval(timer);
            }, 1000);
            FuncCommon.showConsoleInfo("加载下一页，页码：");
            FuncCommon.showConsoleInfo(_that.loadCurPage);
          }
        }
      });
    },
    chooseTopProjectLabel(selId) {
      this.chooseProjectLabelId = selId;
      if (this.chooseProjectLabelId === "myAddProject") {
        this.loadCurPage = 1;
        this.problemList = [];
        this.queryProjectList();
      } else if (this.chooseProjectLabelId === "myNotFinishedProblem") {
        this.loadCurPage = 1;
        this.projectDataList = [];
        this.problemList = [];
        this.queryNotCompletedProblems("NotCompleted");
      } else if (this.chooseProjectLabelId === "myFinishedProblem") {
        this.loadCurPage = 1;
        this.projectDataList = [];
        this.problemList = [];
        this.queryNotCompletedProblems("Completed");
      }
    },
    //查询我的项目
    queryProjectList() {
      this.isLoadingNow = true;
      const urlParams = new URLSearchParams();
      urlParams.append("page", this.loadCurPage);
      urlParams.append("pageCountSize", this.loadPageCountSize);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROJECT_LIST_FOR_ME,
        urlParams,
        data => {
          FuncCommon.showConsoleInfo(data);
          let arr = [];
          const array = data.data.data;
          for (let index in array) {
            FuncCommon.showConsoleInfo(index);
            if (index % 2 === 0) {
              //偶数
              arr.push(array[index]);
              this.projectDataList.push(arr);
            } else {
              //奇数
              arr.push(array[index]);
              arr = [];
            }
          }

          //分页数据
          this.pagination = data.data.pagination;
          if (this.pagination?.curPage === this.pagination?.totalPage) {
            //当前页等于总页数，没有数据了
            this.isShowLoading = false;
          } else {
            this.isShowLoading = true;
          }

          this.isLoadingNow = false;
          FuncCommon.showConsoleInfo(this.projectDataList[0]);
        },
        error => {
          this.isLoadingNow = false;
          FuncCommon.showConsoleError(error);
        }
      );
    },
    //查询我选中的未修改完的问题列表
    queryNotCompletedProblems(findType) {
      const _that = this;
      this.isLoadingNow = true;
      const urlParams = new URLSearchParams();
      urlParams.append("findType", findType);
      urlParams.append("page", this.loadCurPage);
      urlParams.append("pageCountSize", this.loadPageCountSize);
      ConstWeb.axiosRequest(
              ConstWeb.WebApi.QUERY_MINE_COMPLETED_OR_NOT_COMPLETED_PROBLEMS,
              urlParams,
              data => {
                FuncCommon.showConsoleInfo(data);
                const ds = data.data?.data;
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
                if (_that.problemList.length === 0) {
                  _that.isShowLoading = false;
                }

                //分页数据
                this.pagination = data.data.pagination;
                if (this.pagination?.curPage === this.pagination?.totalPage || this.pagination?.totalPage === 0) {
                  //当前页等于总页数，没有数据了
                  this.isShowLoading = false;
                } else {
                  this.isShowLoading = true;
                }

                this.isLoadingNow = false;
                FuncCommon.showConsoleInfo(this.problemList);
              },
              error => {
                this.isLoadingNow = false;
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
.list-enter-active{
  transition: all 1s;
}
/** 移除过程 **/
.list-leave-active {
  transition: all 1s;
}
/*** 开始插入、移除结束的位置变化 ***/
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
