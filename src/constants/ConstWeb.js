const BASIS_URL = "http://192.168.3.21:8099";
const WebApi = {
  USER_LOGIN: BASIS_URL + "/usr/login", //
  USER_GET_VERIFY_CODE_IMG: BASIS_URL + "/usr/getVerifyCode",
  USER_REGISTER: BASIS_URL + "/usr/register",
  UNIVERSAL_VERIFY_TOKEN: BASIS_URL + "/uni/verifyToken" //首次进入是验证token
};

const STORAGE_KEY = {
  KEY_USER_LOGIN_INFO: "keyUserLoginInfo"
};

export default {
  WebApi,
  STORAGE_KEY
};
