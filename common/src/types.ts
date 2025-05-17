import "./web/types"
export interface Task_interface {
    task_name: string,
    start_time: Date
    end_time: Date
    location?: string,
    remark?: string,
    remaind_offset_minutes: number,
}
export const test_common = () => {
    console.log("test_common");
}

// 根据id获取task的post数据
export type POST_task = {
    operation: 'get',
    data: {// 当operation == get
        id: string
    }
} | {
    operation: 'save',
    data: Task_interface,
    task_id:string,
}
