/**
 * 通知信息载体
 */
class NotificationInfo {
    constructor(notifyRole, notifyAvatar, notifyTime, notifyMsg) {
        this.notifyMsg = notifyMsg;
        this.notifyAvatar = notifyAvatar;
        this.notifyRole = notifyRole;
        this.notifyTime = notifyTime;
    }
}

export default {
    NotificationInfo
}
