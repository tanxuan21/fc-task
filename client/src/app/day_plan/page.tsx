'use client'
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import Line from "@/components/Line";
import { get_week_date, get_YMD_date, week_zhou } from '../../utils/time/Date';
import { A_DAY_SECONDS, get_current_HMS_obj, get_HMS_obj, get_seconds_ran_from_date, get_seconds_ran_today } from "@/utils/time/time";
import { useRouter } from "next/navigation";
import { day_plants } from "@/global/day_plans";
import { Rnd } from "react-rnd";


export default () => {

    const router = useRouter();

    const [timelinetop, settimelineTop] = useState<number>(0);
    useEffect(() => {
        settimelineTop(calculate_current_top());
        const t = setInterval(() => {
            settimelineTop(calculate_current_top());
        }, 1000 * 10);
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
                                router.push("/task");
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
                        Object.keys(day_plants.baket).map((key) => {
                            return <div key={key}

                                className={styles['task-item']}
                                style={{
                                    height: `${item_height}px`,
                                    top: `${calculate_precent(day_plants.baket[key].start_time)
                                        }px`
                                }}
                            >
                                <p>{day_plants.baket[key].task_name}</p>
                                <p>{day_plants.baket[key].location}</p>
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