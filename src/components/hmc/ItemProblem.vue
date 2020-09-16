<template>
  <div style="display: flex">
    <div class="item-problem-content">
      <div style="display: flex;margin-bottom: 4px">
        <div style="width: 40px;height: 40px;margin: auto 12px auto 0">
          <LoadingComponents />
        </div>
        <div style="margin: auto 12px auto 0">
          <svg
            t="1600227691504"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9648"
            width="32"
            height="32"
          >
            <path
              d="M511.800117 0c282.689574 0 511.800078 229.110504 511.800078 511.800078s-229.110504 511.800078-511.800078 511.800078-511.800078-229.110504-511.800078-511.800078 229.210465-511.800078 511.800078-511.800078z"
              fill="#3E5BF2"
              p-id="9649"
            ></path>
            <path
              d="M511.800117 321.874268m-149.941429 0a149.941429 149.941429 0 1 0 299.882858 0 149.941429 149.941429 0 1 0-299.882858 0Z"
              fill="#FFFFFF"
              p-id="9650"
            ></path>
            <path
              d="M511.800117 701.725888m-149.941429 0a149.941429 149.941429 0 1 0 299.882858 0 149.941429 149.941429 0 1 0-299.882858 0Z"
              fill="#FFFFFF"
              p-id="9651"
            ></path>
            <path
              d="M701.725927 511.800078m-149.941429 0a149.941429 149.941429 0 1 0 299.882859 0 149.941429 149.941429 0 1 0-299.882859 0Z"
              fill="#FFFFFF"
              p-id="9652"
            ></path>
            <path
              d="M321.874307 511.800078m-149.941429 0a149.941429 149.941429 0 1 0 299.882858 0 149.941429 149.941429 0 1 0-299.882858 0Z"
              fill="#FFFFFF"
              p-id="9653"
            ></path>
            <path
              d="M464.118743 464.018743c-44.382663-14.894182-79.568918-50.080437-94.463101-94.463101 44.382663 14.994143 79.568918 50.080437 94.463101 94.463101zM654.044553 369.655603c-14.894182 44.382663-50.080437 79.568918-94.4631 94.463101 14.894182-44.482624 49.980476-79.568918 94.4631-94.463101zM464.118743 559.581414c-14.894182 44.382663-50.080437 79.568918-94.463101 94.4631 14.894182-44.482624 49.980476-79.568918 94.463101-94.4631zM654.044553 653.944553c-44.382663-14.894182-79.568918-50.080437-94.4631-94.4631 44.382663 14.994143 79.568918 50.080437 94.4631 94.4631z"
              fill="#3E5BF2"
              opacity=".3"
              p-id="9654"
            ></path>
          </svg>
        </div>

        <h6 class="item-title">{{problemObj?.refTProjectSystemDevicesEntity?.systemDevicesName}}&nbsp;=>&nbsp;{{problemObj?.refTProjectEntity?.projectName}}&nbsp;=>&nbsp;<span>{{problemObj?.ppModulePage}}</span></h6>
      </div>
      <span class="item-c-time"
        >2020-01-01&nbsp;00:00&nbsp;&nbsp;=>=>&nbsp;&nbsp;</span
      ><span class="item-c-content"
        >{{problemObj?.ppContent}}
      </span>
      <div style="width: 100%;text-align: right">
        <ul class="item-bottom-info">
          <li>
            <button type="button" class="btn btn-primary" @click.prevent="clickChooseProblem(this,problemObj?.id)">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              选择该问题
            </button>
          </li>
          <li>
            <button type="button" class="btn btn-success">
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
              <select name="progress" style="background: #FFC107;color: black">
                <option label="修改进度" value="0"></option>
                <option label="10%" value="10"></option>
                <option label="20%" value="20"></option>
                <option label="30%" value="30"></option>
                <option label="40%" value="40"></option>
                <option label="50%" value="50"></option>
                <option label="60%" value="60"></option>
                <option label="70%" value="70"></option>
                <option label="80%" value="80"></option>
                <option label="90%" value="90"></option>
                <option label="100%" value="100"></option>
              </select>
            </label>
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
          <li>
            <div style="color: #AAAAAA;font-size: .75rem">
              <span>正在修改：</span>&nbsp;002
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponents from "@/components/hmc/LoadingComponents";
import FuncCommon from "@/constants/FuncCommon";

export default {
  name: "ItemProblem",
  props: {
    problemObj: Object
  },
  components: { LoadingComponents },
  methods: {
    clickChooseProblem(__this,pId) { //选择修改一个问题
      FuncCommon.showConsoleInfo("选择修改一个问题ID:");
      FuncCommon.showConsoleInfo(pId);
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
