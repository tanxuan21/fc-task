import React from "react";


export const notify = (title: string = '标题', option: NotificationOptions) => {
    // 检查浏览器是否支持 Notification API
    if (!("Notification" in window)) {
        console.log("您的浏览器不支持系统通知");
    } else {
        // 请求通知权限
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                // 用户允许通知，发送通知
                const not = new Notification(title, option
                );
                not.onclick = () => {

                }
                //setTimeout(()=>{not.close()},1000)
            } else {
                console.log("用户拒绝了通知权限");
            }
        });
    }
}