import FuncCommon from "@/constants/FuncCommon";
import mainJs from "../main";

/**
 * 发送通知
 * @param notificationInfo
 */
function sendNotification(notificationInfo) {
    FuncCommon.showConsoleInfo(notificationInfo)
    mainJs.vue.$store.commit("addNotification", notificationInfo);
}

export default {
  sendNotification
};
