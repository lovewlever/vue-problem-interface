import ConstWeb from "./ConstWeb";
import FuncCommon from "./FuncCommon";
import NotifyCommon from "@/constants/NotifyCommon";
import Classes from "@/constants/Classes";

let ws;

const heartCheck = {
  timeout: 10000, //
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    this.start();
  },
  start: function() {
    const self = this;
    this.timeoutObj = setTimeout(function() {
      ws.send("HeartBeat");
      self.serverTimeoutObj = setTimeout(function() {
        ws.close(); // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout);
    }, this.timeout);
  }
};

function openWebSocket() {
  try {
    ws = new WebSocket(
      ConstWeb.WS_URL + "?userId=" + FuncCommon.getStorageLoginInfo()?.id
    );
    ws.onopen = function() {
      heartCheck.start();
      NotifyCommon.sendNotification(
        new Classes.NotificationInfo("system", "", "12:32", "WebSocket连接成功")
      );
    };

    ws.onmessage = function(e) {
      //处理信息
      FuncCommon.showConsoleInfo(e.data);
      e = e || event;
      if (e.data === "HeartbeatSuccess") {
        heartCheck.reset();
      } else {
        NotifyCommon.sendNotification(
          new Classes.NotificationInfo("system", "", "12:32", e.data)
        );
      }
    };

    ws.onclose = function() {
      openWebSocket();
      //处理连接关闭事件
      FuncCommon.showConsoleInfo("WsOnClose:");
    };

    ws.onerror = function() {
      FuncCommon.showConsoleInfo("WsOnError:");
    };
  } catch (e) {
    e;
  }
  return ws;
}

export default {
  openWebSocket
};
