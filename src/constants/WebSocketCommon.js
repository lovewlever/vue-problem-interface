import ConstWeb from "./ConstWeb";
import FuncCommon from "./FuncCommon";
import NotifyCommon from "@/constants/NotifyCommon";
import Classes from "@/constants/Classes";

function openWebSocket() {
  const ws = new WebSocket(
    ConstWeb.WS_URL + "?userId=" + FuncCommon.getStorageLoginInfo()?.id
  );
  ws.onopen = function() {
    //处理连接开启事件
    console.log("Opening");
    NotifyCommon.sendNotification( new Classes.NotificationInfo("system","","12:32","WebSocket连接成功"))
  };

  ws.onmessage = function(e) {
    //处理信息
    e = e || event; //获取事件，这样写是为了兼容IE浏览器
    NotifyCommon.sendNotification( new Classes.NotificationInfo("system","","12:32",e.data))
    console.log(e.data);
  };

  ws.onclose = function() {
    //处理连接关闭事件
    console.log("Closing");
    NotifyCommon.sendNotification( new Classes.NotificationInfo("system","","12:32","WebSocket异常关闭"))
  };
  return ws;
}

export default {
  openWebSocket
};
