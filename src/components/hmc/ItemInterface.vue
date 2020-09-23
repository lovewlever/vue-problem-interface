<template>
  <div style="display: flex">
    <div class="item-problem-content">
      <div style="display: flex;margin-bottom: 4px">
        <template v-if="problemObj?.ppCompleteSchedule < 100">
          <div style="width: 40px;height: 40px;margin: auto 12px auto 0">
            <LoadingComponents :progress2="problemObj?.ppCompleteSchedule" />
          </div>
        </template>
        <div style="margin: auto 12px auto 0">
          <!--进度为100时 显示完成图标-->
          <template v-if="problemObj?.ppCompleteSchedule === 100">
            <svg t="1600421117879" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7838" width="32" height="32"><path d="M277.9 742s167.9-294.1 465.3-465.3C575.7 577.8 277.9 742 277.9 742z" fill="#FFFFFF" p-id="7839"></path><path d="M743.1 742S575.2 447.9 277.8 276.7C445.3 577.8 743.1 742 743.1 742z" fill="#FFFFFF" p-id="7840"></path><path d="M513.2 959.8S639.3 933 746.8 817.7C841.4 716.2 868.2 483.6 868.2 151c-224.2 31.2-355-87-355-87h-2.3s-130.8 118.2-355.1 87c0 332.5 26.8 565.5 121.5 667 107.5 115.3 233.6 142 233.6 142" fill="#0EC469" p-id="7841"></path><path d="M303.6 474.4s57 132.9 145.6 132.9c85.4 0 345-302.1 345-302.1S541.9 717 457.6 717c-70.2 0-120.8-100.2-154-242.6z" fill="#FFFFFF" p-id="7842"></path></svg>
          </template>
        </div>

        <h6 class="item-title">
          {{ problemObj?.refTProjectEntity?.projectName }}&nbsp;=>&nbsp;<span
            style="color: #a3d900"
            >{{
              problemObj?.refTProjectSystemDevicesEntity?.systemDevicesName
            }}</span
          >&nbsp;=>&nbsp;<span>{{ problemObj?.ppModulePage }}</span>
        </h6>
      </div>
      <span class="item-c-time"
        >{{
          formatDate(problemObj?.ppAddTimestamp)
        }}&nbsp;&nbsp;=>=>&nbsp;&nbsp;</span
      ><span class="item-c-content">{{ problemObj?.ppContent }} </span>
      <div style="width: 100%;text-align: right">
        <ul class="item-bottom-info">
            <li>
              <button
                type="button"
                class="btn btn-primary"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                选择该问题
              </button>
            </li>
            <li>
              <button
                type="button"
                class="btn btn-success"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                完成该问题
              </button>
            </li>

            <li>
              <label>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  style="color: white"
                ></span>
                <select name="progress">
                  <option label="转让该问题" value=""></option>
                  <option label="001" value="jfklejka54seaasdyr6"></option>
                </select>
              </label>
            </li>
        </ul>
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
import LoadingComponents from "./LoadingComponents";
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
  components: { LoadingComponents },
  created() {
    this.localLoginUserId = FuncCommon.getStorageLoginInfo().id;
  },
  mounted() {},
  methods: {
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
  margin: 12px 45px 0px 48px;
  text-align: left;
  border-bottom-width: 1px;
  border-bottom-color: slategray;
  border-bottom-style: dashed;
}

.item-bottom-info {
  margin-top: 16px;
  margin-bottom: 10px;
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
  margin: auto 0;
}

.item-title span {
  color: #aaaaaa;
}

.item-c-time {
  color: #787878;
}

.item-c-content {
  color: wheat;
  letter-spacing: 2px;
  font-size: 0.94rem;
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

.spinner-border-sm {
  width: 0.8rem;
  height: 0.8rem;
}
</style>
