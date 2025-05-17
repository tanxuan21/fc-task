export const A_DAY_SECONDS = 24 * 60 * 60;

export const A_DAY_MUNITES = 24 * 60;


export const get_current_HMS_obj = () => {
    // 获取当前日期和时间
    const now = new Date();

    // 获取当前的小时、分钟和秒
    const hours = now.getHours(); // 获取小时（0-23）
    const minutes = now.getMinutes(); // 获取分钟（0-59）
    const seconds = now.getSeconds(); // 获取秒（0-59）

    // 格式化为两位数
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');


    return {
        hours,
        minutes,
        seconds,
    }

}


export const get_HMS_obj = (d: Date) => {
    // 获取当前日期和时间
    const now = d;

    // 获取当前的小时、分钟和秒
    const hours = now.getHours(); // 获取小时（0-23）
    const minutes = now.getMinutes(); // 获取分钟（0-59）
    const seconds = now.getSeconds(); // 获取秒（0-59）

    // 格式化为两位数
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');


    return {
        hours,
        minutes,
        seconds,
    }
}
/**
 * 今天流逝了多少秒
 */
export const get_seconds_ran_today = () => {
    const current_t = get_current_HMS_obj();
    const s = current_t.hours * 60 * 60 + current_t.minutes * 60 + current_t.seconds;
    return s;
}


export const get_seconds_ran_from_date = (d:Date)=>{
    const current_t = get_HMS_obj(d);
    const s = current_t.hours * 60 * 60 + current_t.minutes * 60 + current_t.seconds;
    return s;
}