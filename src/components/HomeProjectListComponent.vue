<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li>
          <input
            type="text"
            name="search"
            placeholder="请输入搜索内容"
            style="background: none;border: none;outline: none;color: white"
          />
        </li>
      </ul>
    </div>

    <div class="hmc-item-content" id="setHeight">

      <ItemProject v-for="obj in projectDataList" :key="obj.id" :double-data-list="obj" />

      <div style="margin: 40px auto 40px auto" v-if="isShowLoading">
        <div class="spinner-border text-primary" role="status" >
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
  name: "HomeProjectListComponent",
  data() {
    return {
      projectDataList: [],
      pagination: Object,
      isShowLoading: false, //是否显示 加载圈
      loadPageCountSize: 10, //每次加载多少条数据
      loadCurPage: 1, //加载数据的当前页
      isLoadingNow: false //是否正在加载数据
    };
  },
  components: { ItemProject },
  beforeCreate() {
    document.title = "PROJECT";
  },
  mounted() {
   this.onscrollS();
    this.queryProjectList();
  },
  methods: {
    onscrollS() {
      const _that = this
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
      $("#setHeight").scroll(function () {
        const h = $(this).height();
        const sh = $(this)[0].scrollHeight;
        const st = $(this)[0].scrollTop;
        if(h+st>=sh){
          if (_that.pagination?.curPage < _that.pagination?.totalPage) { //如果当前页小于等于总页数 则加载下一页的数据
            if (_that.isLoadingNow) return; //如果正在请求数据，等待请求完成后再继续下一次请求
            _that.loadCurPage = _that.pagination?.curPage + 1;
            const timer = setInterval(() => {
              clearInterval(timer);
              _that.queryProjectList();
            }, 1000)
            FuncCommon.showConsoleInfo("加载下一页，页码：");
            FuncCommon.showConsoleInfo(_that.loadCurPage);
          }
        }
      })
    },
    queryProjectList() {
      this.isLoadingNow = true;
      const urlParams = new URLSearchParams();
      urlParams.append("page", this.loadCurPage);
      urlParams.append("pageCountSize", this.loadPageCountSize);
      ConstWeb.axiosRequest(
        ConstWeb.WebApi.QUERY_PROJECT_LIST,
        urlParams,
        data => {
          FuncCommon.showConsoleInfo(data);
          let arr = [];
          const array = data.data.data;
          for (let index in array) {
            FuncCommon.showConsoleInfo(index);
            if (index % 2 === 0) { //偶数
              arr.push(array[index]);
              this.projectDataList.push(arr);
            } else { //奇数
              arr.push(array[index]);
              arr = [];
            }
          }
          //分页数据
          this.pagination = data.data.pagination;
          if (this.pagination?.curPage === this.pagination?.totalPage) { //当前页等于总页数，没有数据了
            this.isShowLoading = false;
          } else {
            this.isShowLoading = true;
          }

          this.isLoadingNow = false;
          FuncCommon.showConsoleInfo(this.projectDataList);
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

/*列表过度动画*/
/** 插入过程 **/
.v-enter,
.v-leave-to{
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-leave-active{
  transition: all 0.6s ease;
}
</style>
