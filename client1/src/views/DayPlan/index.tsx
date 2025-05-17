'use client'
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import Line from "@/components/Line";
import { get_week_date, get_YMD_date, week_zhou } from '../../utils/time/Date';
import { A_DAY_SECONDS, get_current_HMS_obj, get_HMS_obj, get_seconds_ran_from_date, get_seconds_ran_today } from "@/utils/time/time";
import { useNavigate } from "react-router-dom";
// import { day_plants } from "@/global/day_plans";
import axios from "axios";
import { API_URL } from "../Config";
import { set_taskeditor_params } from "../TaskEditor/taskstatus";
import { setHours, startOfDay } from "date-fns";
import { Task_interface } from "@fc-task/common";
import { POST_task } from '@fc-task/common';


export default () => {

    const router = useNavigate();

    const [timelinetop, settimelineTop] = useState<number>(0);
    const [tasks, setTasks] = useState<(Task_interface & { task_id: string })[]>([])
    useEffect(() => {
        settimelineTop(calculate_current_top());
        const t = setInterval(() => {
            settimelineTop(calculate_current_top());
        }, 1000 * 10);
        (async function () {
            const data = await axios.get(`${API_URL}/api/taskid/`);
            console.log('task ids:', data.data);
            const newtasks = await Promise.all((data.data as string[]).map(async (id) => {
                const body: POST_task = { operation: 'get', data: { id } };
                const t = (await axios.post(`${API_URL}/api/task/`, body)).data;
                return {
                    task_id: id, ...t,
                    start_time: new Date(t.start_time),
                    end_time: new Date(t.end_time)
                }
            }))
            setTasks(prev => [...prev, ...newtasks])
        })()
        return () => {
            clearInterval(t);
        }
    }, [])
    const item_height = 65;
    const calculate_current_top = () => {
        const walked_seconds = get_seconds_ran_today();
        return (walked_seconds / A_DAY_SECONDS) * item_height * 24;
    }

    const calculate_precent = (d: Date) => {
        const s = get_seconds_ran_from_date(d)
        return (s / A_DAY_SECONDS) * item_height * 24;
    }
    return <div
        className={`${styles['container']}`}>
        <header className={`${styles['header']}`}>
            <span className={`${styles['day-span']}`}>{get_YMD_date()}</span>
            <span className={`${styles['week-span']}`}>{week_zhou[get_week_date() - 1]}</span>
            <div className={styles["icon-wapper"]}></div>
        </header>
        <div className={`${styles['scroller-container']}`}>
            <main className={`${styles['main']}`}>
                {/* 小时单元格 */}
                <aside>
                    {
                        new Array(24).fill(0).map((item, index) => {
                            return <div
                                key={index}
                                style={{ height: `${item_height}px` }} className={`${styles['hour-label']}`}>{index}</div>
                        })
                    }
                </aside>
                <div className={`${styles['task-container']}`}
                >
                    {new Array(24).fill(0).map((item, index) => {
                        return <div
                            key={index}
                            onClick={() => {
                                set_taskeditor_params({ operation: "add", start_time: setHours(startOfDay(new Date()), index) })
                                router("/taskeditor");
                            }}
                            style={{
                                height: `${item_height}px`,
                                top: `${index * item_height}px`,
                            }} className={`${styles['add-item']}`}
                        >
                            + 新建任务
                        </div>
                    })}
                    {/* 已有的任务 */}
                    {
                        tasks.map((t) => {
                            return <div key={t.task_id}
                                onDoubleClick={() => {
                                    set_taskeditor_params({
                                        operation: "modify", task_id: t.task_id
                                    });
                                    router("/taskeditor")
                                }}
                                className={styles['task-item']}
                                style={{
                                    height: `${calculate_precent(t.end_time)-calculate_precent(t.start_time)}px`,
                                    top: `${calculate_precent(t.start_time)
                                        }px`
                                }}
                            >
                                <p>{t.task_name}</p>
                                <p>{t.location}</p>
                            </div>
                        })
                    }
                </div>

                {/* 当前时间线 */}
                <Line
                    top={timelinetop}
                    styles={{
                        marginLeft: '25px',
                    }}
                    size={10} color="#0a96ff"></Line>
            </main></div>
    </div>
}