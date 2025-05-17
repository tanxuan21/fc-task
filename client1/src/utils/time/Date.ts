import { format, getDate, getDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';




export const get_YMD_date = () => {
    const today = new Date();
    const formattedDate = format(today, 'yyyy年M月d日', { locale: zhCN });
    return formattedDate;
}
export const week_zhou = [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
    "周日",
]
export const get_week_date = ()=>{
    return getDay(new Date())
}