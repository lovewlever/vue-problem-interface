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
              'label-li-active': chooseProjectLabelId === 'myAddProjectProblem'
            }
          ]"
          @click="chooseTopProjectLabel('myAddProjectProblem')"
        >
          我添加的问题
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
import $ from "jquery";
import ConstWeb from "../constants/ConstWeb";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "HomeMineComponent",
  components: { ItemProject },
  data() {
    return {
      projectDataList: [],
      chooseProjectLabelId: "myAddProject", //选中的某个标签
      pagination: Object,
      isShowLoading: false, //是否显示 加载圈
      loadPageCountSize: 10, //每次加载多少条数据
      loadCurPage: 1 //加载数据的当前页
    };
  },
  created() {},
  mounted() {
    this.onscrollS();
    this.queryProjectList();
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
            _that.loadCurPage = _that.pagination?.curPage + 1;
            const timer = setInterval(() => {
              clearInterval(timer);
              _that.queryProjectList();
            }, 1000);
            FuncCommon.showConsoleInfo("加载下一页，页码：");
            FuncCommon.showConsoleInfo(_that.loadCurPage);
          }
        }
      });
    },
    chooseTopProjectLabel(selId) {
      this.chooseProjectLabelId = selId;
    },
    queryProjectList() {
      //查询我的项目
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
/*进入前效果*/
.list-enter  {
  opacity: 0;
  transform: translateY(-30px);
}
/*//进入的过渡时间和函数*/
.list-enter-active{
  transition: all 1s;
}
/*//进入后效果*/
.list-enter-to {
  opacity: 1;
  transform: translateY(30px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
