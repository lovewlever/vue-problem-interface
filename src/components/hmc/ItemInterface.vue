<template>
  <div style="display: flex;margin: 8px 0 0 0">
    <div class="item-problem-content" @click.prevent="clickToInterfaceDetails">
      <div style="display: flex;margin-bottom: 8px">
        <div style="margin: auto 12px auto 0">
          <svg
            t="1600421117879"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7838"
            width="32"
            height="32"
          >
            <path
              d="M277.9 742s167.9-294.1 465.3-465.3C575.7 577.8 277.9 742 277.9 742z"
              fill="#FFFFFF"
              p-id="7839"
            ></path>
            <path
              d="M743.1 742S575.2 447.9 277.8 276.7C445.3 577.8 743.1 742 743.1 742z"
              fill="#FFFFFF"
              p-id="7840"
            ></path>
            <path
              d="M513.2 959.8S639.3 933 746.8 817.7C841.4 716.2 868.2 483.6 868.2 151c-224.2 31.2-355-87-355-87h-2.3s-130.8 118.2-355.1 87c0 332.5 26.8 565.5 121.5 667 107.5 115.3 233.6 142 233.6 142"
              fill="#0EC469"
              p-id="7841"
            ></path>
            <path
              d="M303.6 474.4s57 132.9 145.6 132.9c85.4 0 345-302.1 345-302.1S541.9 717 457.6 717c-70.2 0-120.8-100.2-154-242.6z"
              fill="#FFFFFF"
              p-id="7842"
            ></path>
          </svg>
        </div>

        <div>
          <h6 class="item-title">
            {{ problemObj?.refTProjectEntity?.projectName }}&nbsp;=>&nbsp;
            <span style="color: #a3d900"
              >(差强人意)&nbsp;{{ problemObj?.piName }}</span
            >&nbsp;=>&nbsp;
            <span>{{
              JSON.parse(problemObj?.piDataJson)?.interfaceDescription
            }}</span>
          </h6>

          <div class="item-c-content" @click.stop="clickBlank">
            <span class="item-c-time"
              >{{
                formatDate(problemObj?.piAddTimestamp)
              }}&nbsp;&nbsp;=>=>&nbsp;&nbsp;{{
                JSON.parse(problemObj?.piDataJson)?.requestUrl
              }}</span
            >
          </div>
        </div>
      </div>

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
              <h5 class="modal-title" id="exampleModalLabel">提醒</h5>
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
              <span id="dialogMsg"></span>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click.prevent="clickDialogCancel"
              >
                取消
              </button>
              <button id="dialogCommit" type="button" class="btn btn-primary">
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FuncCommon from "../../constants/FuncCommon";
import $ from "jquery";
import { formatDate2 } from "@/constants/Filter";

export default {
  name: "ItemInterface",
  props: {
    problemO: Object
  },
  data() {
    return {
      problemObj: this.problemO,
      localLoginUserId: String
    };
  },
  components: {},
  created() {
    this.localLoginUserId = FuncCommon.getStorageLoginInfo().id;
  },
  mounted() {},
  methods: {
    clickBlank() {
      return false;
    },
    clickToInterfaceDetails() {
      this.$router.push({
        path: "/homeInterfaceAddOrEditAndDetailsComponent",
        query: {
          timestamp: FuncCommon.getTimestamp(),
          interfaceId: this.problemObj.id,
          projectId: this.problemObj.projectId
        }
      });
    },
    clickDialogCancel() {
      $("#dialogCommit").unbind("click");
    },
    formatDate(time) {
      const data = new Date(time);
      return formatDate2(data, "yyyy-MM-dd HH:mm:ss");
    }
  }
};
</script>

<style scoped>
.item-problem-content {
  flex: 1;
  margin: 8px 45px 0px 48px;
  text-align: left;
  border-bottom-width: 1px;
  border-bottom-color: slategray;
  border-bottom-style: dashed;
}

.item-problem-content:hover {
  cursor: pointer;
}

.item-bottom-info li {
  list-style-type: none;
  display: inline-block;
  margin: auto 14px;
}

.item-bottom-info li:hover {
  cursor: pointer;
}

.item-title {
  color: #cdcdcd;
  margin: 0 0 4px 0;
}

.item-title span {
  color: #aaaaaa;
}

.item-c-time {
  color: #787878;
  font-size: 0.8rem;
  white-space: nowrap;
}

.item-c-content {
  color: wheat;
  font-size: 0.94rem;
  width: 1000px;
  overflow: hidden;
}

select {
  background: #dc3545;
  border-radius: 0.25rem;
  padding: 0 0.75rem;
  height: 33px;
  border: none;
  font-size: 0.8rem;
  line-height: 1.5;
  color: #fff;
}

select:hover {
  cursor: pointer;
}

.btn {
  font-size: 0.8rem;
  padding: 0 0.75rem;
  height: 33px;
}
</style>
