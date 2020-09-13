import _axios from "axios";
import ConstWeb from "./ConstWeb";

function getSessionKey() {
  return window.localStorage.getItem(
    ConstWeb.STORAGE_KEY.KEY_GET_VERIFY_CODE_SESSION_KEY
  );
}

function getStorageLoginInfo() {
  return JSON.parse(
    window.localStorage.getItem(ConstWeb.STORAGE_KEY.KEY_USER_LOGIN_INFO)
  );
}

/**
 * 获取验证码
 * @param funcImageBufferArray
 * @param error
 */
function getVerify(funcImageBufferArray, error) {
  window.localStorage.setItem(
    ConstWeb.STORAGE_KEY.KEY_GET_VERIFY_CODE_SESSION_KEY,
    uuid()
  );
  let urlParams = new URLSearchParams();
  urlParams.append("sessionKey", getSessionKey());
  _axios({
    url: ConstWeb.WebApi.USER_GET_VERIFY_CODE_IMG,
    data: urlParams,
    responseType: "arraybuffer",
    method: "POST",
    crossDomain: true,
    xhrFields: { withCredentials: true }
  })
    .then(data => {
      console.info(data);
      funcImageBufferArray(arrayBufferToBase64(data.data));
    })
    .catch(err => {
      error(err);
    });
}

/**
 * 验证码图片转换
 * @param buffer
 * @returns {string}
 */
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:image/jpeg;base64," + window.btoa(binary);
}

/**
 * 生成sessionKey
 * @returns {string}
 */
function uuid() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

export default {
  getVerify,
  getSessionKey,
  getStorageLoginInfo
};
