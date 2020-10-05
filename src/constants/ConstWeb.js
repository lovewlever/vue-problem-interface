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
  QUERY_PROJECT_OPERATE_RECORDER: BASIS_URL + "/pc/queryProjectOperateRecorders", //查询项目的操作记录
  QUERY_RECOMMEND_PROJECT_LABEL_FOR_PROBLEM: BASIS_URL + "/ppc/recommendProjectLabelsForProblem", //查询问题页面上面项目标签
  QUERY_PROJECT_LABEL_FOR_PROBLEM_BY_PAGINATION: BASIS_URL + "/ppc/queryProjectLabelsForProblemByPagination", //查询问题页面上面项目标签
  QUERY_PROJECT_SYSTEM_DEVICES: BASIS_URL + "/ppc/queryProjectSystemDevices", //查询添加问题时选择的设备列表
  SAVE_PROJECT_SAVE_PROBLEM_LIST: BASIS_URL + "/ppc/saveProjectSaveProblemList", //查询添加问题时选择的设备列表
  QUERY_PROBLEM_LIST_BY_PROJECT_ID: BASIS_URL + "/ppc/queryProblemListByProjectId", //根据项目id查询问题列表
  QUERY_PROBLEM_LIST_NEW_TIME_COUNT: BASIS_URL + "/ppc/queryProblemListNewTimeCount", //查询最新添加的指定条问题
  CHOOSE_OR_CANCEL_PROBLEM: BASIS_URL + "/ppc/queryChooseOrCancelProblem", //选择或取消选择一个问题
  UPDATE_MODIFY_PROBLEM_PROGRESS: BASIS_URL + "/ppc/updateProblemProgress", //修改问题进度
  QUERY_MINE_COMPLETED_OR_NOT_COMPLETED_PROBLEMS: BASIS_URL + "/ppc/queryMineCompletedOrNotProblems", //查询我的 选中未修改完或者已修改完成的问题
  UPDATE_TRANSFER_ISSUES: BASIS_URL + "/ppc/updateTransferIssues", //转让问题给其他用户
  INTERFACE_REQUEST_AND_RETURN: BASIS_URL + "/pif/requestInterface", //请求用户填写的接口并返回数据
  QUERY_INTERFACE_BY_ID: BASIS_URL + "/pif/queryInterfaceById", // 查询接口详情
  QUERY_INTERFACES_BY_PROJECT_ID: BASIS_URL + "/pif/queryInterfacesByProjectId", // 分页查询项目下的接口
  SAVE_A_INTERFACE: BASIS_URL + "/pif/saveInterface", // 新增一个接口
  ADD_OR_UPDATE_CS: BASIS_URL + "/pics/addOrUpdateInterfaceCs" //添加或修改接口评论/评分

};
const RESULT_CODE = {
  RESULT_CODE_SUCCESS: 200, //成功
  RESULT_CODE_NOT_LOGIN: 4089 //未登录
};

const STORAGE_KEY = {
  KEY_USER_LOGIN_INFO: "keyUserLoginInfo",
  KEY_GET_VERIFY_CODE_SESSION_KEY: "sessionKey",
  KEY_HISTORY_CLICK_PROJECT_LABEL_FOR_INTERFACE: "historyClickProjectLabelForInterface"
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
        mainJs.vue.$router.push({path: "/login",query:{timestamp:FuncCommon.getTimestamp()}});
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
