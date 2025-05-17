import path from "path"
import { Task_Class_interface } from "./types";
import { Task_interface } from '@fc-task/common';
import objectHash from "object-hash";
import { promises as fs } from "fs";

export class Tasks {
    url: string = path.join(process.cwd(), 'tasks');
    data: Task_Class_interface = { ids: [], data: {} }
    constructor(){
        this.read();
    }
    async read() {
        const data: Task_Class_interface = JSON.parse(await fs.readFile(path.join(process.cwd(), "database/tasks/tasks_data.json"), { encoding: 'utf-8' }));
        this.data = data;
    }
    collision(new_id: string) {
        return this.data.ids.includes(new_id)
    }
    add_task(task: Task_interface, save: boolean = true) { // 添加任务到缓存区
        const id = objectHash(task);
        if (this.collision(id)) {
            console.error("id 冲突")
            return false;
        }
        this.data.ids.push(id);
        this.data.data[id] = task;
        if (save) this.save();
    }
    modify_task(id: string, newTask: Task_interface) {
        if (!this.collision(id)) return false
    }
    // 对标文件系统
    async save() {
        const str = JSON.stringify(this.data, null, 4);
        await fs.writeFile(path.join(process.cwd(), "database/tasks/tasks_data.json"), str, 'utf-8')
    }
}

export const TasksInstance = new Tasks();