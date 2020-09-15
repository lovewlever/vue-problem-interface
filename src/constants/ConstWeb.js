import _axios from "axios";
import mainJs from "../main";
import FuncCommon from "./FuncCommon";

const BASIS_URL = "http://192.168.3.21:8099";
const WS_URL = "ws://192.168.3.21:8099/ws/websocket.server";

//const BASIS_URL = "http://192.168.1.113:8099";
//const WS_URL = "ws://192.168.1.113:8099/ws/websocket.server";

const WebApi = {
  USER_LOGIN: BASIS_URL + "/usr/login", //
  USER_GET_VERIFY_CODE_IMG: BASIS_URL + "/usr/getVerifyCode",
  USER_REGISTER: BASIS_URL + "/usr/register",
  UNIVERSAL_VERIFY_TOKEN: BASIS_URL + "/uni/verifyToken", //首次进入是验证token
  CREATE_PROJECT: BASIS_URL + "/pc/addNewProject", //创建项目
  QUERY_PROJECT_LIST: BASIS_URL + "/pc/queryPlist", //查询项目列表
  QUERY_PROJECT_LIST_FOR_ME: BASIS_URL + "/pc/queryProjectsByUserId", //查询我发布的项目
  QUERY_PROJECT_DETAILS: BASIS_URL + "/pc/queryProjectById", //查询项目详情
  QUERY_PROJECT_OPERATE_RECORDER:
    BASIS_URL + "/pc/queryProjectOperateRecorders", //查询项目的操作记录
  QUERY_RECOMMEND_PROJECT_LABEL_FOR_PROBLEM:
    BASIS_URL + "/ppc/recommendProjectLabelsForProblem", //查询问题页面上面项目标签
  QUERY_PROJECT_SYSTEM_DEVICES: BASIS_URL + "/ppc/queryProjectSystemDevices", //查询添加问题时选择的设备列表
  SAVE_PROJECT_SAVE_PROBLEM_LIST: BASIS_URL + "/ppc/saveProjectSaveProblemList", //查询添加问题时选择的设备列表
  QUERY_PROBLEM_LIST_BY_PROJECT_ID: BASIS_URL + "/ppc/queryProblemListByProjectId", //根据项目id查询问题列表
  QUERY_PROBLEM_LIST_NEW_TIME_COUNT: BASIS_URL + "/ppc/queryProblemListNewTimeCount" //查询最新添加的指定条问题
};
const RESULT_CODE = {
  RESULT_CODE_SUCCESS: 200, //成功
  RESULT_CODE_NOT_LOGIN: 4089 //未登录
};

const STORAGE_KEY = {
  KEY_USER_LOGIN_INFO: "keyUserLoginInfo",
  KEY_GET_VERIFY_CODE_SESSION_KEY: "sessionKey",
    KEY_SAVE_UNSUBMITTED_PROBLEM_OBJ: "saveUnCommitProblemObj" // 保存未提交的问题到本地 下次打开页面时读取
};

/**
 * 网络请求
 * @param url
 * @param urlParams
 * @param success
 * @param error
 */
function axiosRequest(url, urlParams, success, error) {
  const token = FuncCommon.getStorageLoginInfo().token;

  _axios(
    {
      url: url,
      data: urlParams,
      method: "POST",
      headers: {
        token: token
      }
    },
    { withCredentials: true }
  )
    .then(data => {
      if (data.data.code === RESULT_CODE.RESULT_CODE_NOT_LOGIN) {
        mainJs.vue.$router.push("/login");
      } else {
        FuncCommon.showConsoleInfo(data);
        success(data);
      }
    })
    .catch(err => {
      FuncCommon.showConsoleError(err);
      error(err);
    });
}

export default {
  WebApi,
  STORAGE_KEY,
  RESULT_CODE,
  WS_URL,
  axiosRequest
};
