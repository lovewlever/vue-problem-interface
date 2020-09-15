import ConstWeb from "./ConstWeb";
import FuncCommon from "./FuncCommon";

function openWebSocket() {
    const ws = new WebSocket(ConstWeb.WS_URL + "?userId=" +FuncCommon.getStorageLoginInfo()?.id)
    ws.onopen = function() {          //处理连接开启事件
        console.log('Opening');
        ws.send('start');
    };

    ws.onmessage = function(e) {      //处理信息
        e = e || event; 		   //获取事件，这样写是为了兼容IE浏览器
        console.log(e.data);
    };

    ws.onclose = function() {         //处理连接关闭事件
        console.log('Closing');
        alert("WebSocket异常关闭")
    };
    return ws
}

export default {
    openWebSocket
}
