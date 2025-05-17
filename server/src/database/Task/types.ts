import { Task_interface } from '@fc-task/common';

export interface Task_Class_interface {
    ids: string[],// task id列表
    data: {
        [key: string]: Task_interface
    }
}