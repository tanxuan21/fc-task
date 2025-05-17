'use client'
/**
 * 当日计划类实例
 */
import { generateRandomKey } from "@/utils/random/key"
import { addMinutes } from "date-fns"
import hash from 'object-hash'
// 任务接口
import { Task_interface } from "@fc-task/common"

export const day_plants = new
    (class DayPlants {
        baket: {
            [key: string]: Task_interface
        } = {

            }
        constructor() {
            const _ =
            {
                task_name: "人工智能导论",
                start_time: new Date(),
                end_time: addMinutes(new Date, 20),
                remaind_offset_minutes: 0,
                location: "六教6A017"
            }; this.baket[hash(_)] = _;
        }
        // 获取
        fetch() { }
        sort() {
            // 根据start time属性排序
        }
        add(task_item: Task_interface) {
            this.baket[hash(task_item)] = task_item;
        }
        delete(key: string) {
            delete this.baket[key];
        }

    })()
