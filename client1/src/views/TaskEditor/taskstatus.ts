
// import { proxy } from "valtio";

// export const current_task = proxy<{
//     task_id: string
// }>({ task_id: '' })

// current_task.task_id = '';// 当我修改这个proxy的值

// 使用它的组件就会响应式更新吗?

// 要么是修改旧任务,要么创建新任务
type task_editor_params_type = {
    operation:"modify",
    task_id: string,
} | {
    operation:"add",
    start_time: Date,
} | null;

let parems: task_editor_params_type = null;

export const set_taskeditor_params = (p: task_editor_params_type) => {
    parems = p;
}

export const get_taskeditor_params = ()=>{
    return parems;
}

export const clear_taskeditor_params = ()=>{
    parems = null;
}