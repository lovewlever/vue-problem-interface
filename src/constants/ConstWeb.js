import _axios from "axios";
import mainJs from "../main";
import FuncCommon from "./FuncCommon";

const BASIS_URL = "http://192.168.3.21:8099";
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

  QUERY_RECOMMEND_PROJECT_LABEL_FOR_PROBLEM: BASIS_URL + "/ppc/recommendProjectLabelsForProblem" //查询问题页面上面项目标签
};
const RESULT_CODE = {
  RESULT_CODE_SUCCESS: 200, //成功
  RESULT_CODE_NOT_LOGIN: 4089 //未登录
};

const STORAGE_KEY = {
  KEY_USER_LOGIN_INFO: "keyUserLoginInfo",
  KEY_GET_VERIFY_CODE_SESSION_KEY: "sessionKey"
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
        console.info(data);
        success(data);
      }
    })
    .catch(err => {
      console.info(err);
      error(err);
    });
}

export default {
  WebApi,
  STORAGE_KEY,
  RESULT_CODE,
  axiosRequest
};
