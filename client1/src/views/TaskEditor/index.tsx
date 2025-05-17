import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { POST_task, Task_interface } from "@fc-task/common";
import { useEffect, useState } from "react";
import { addMinutes, format } from "date-fns";
import { API_URL } from "../Config";
import axios from "axios";
import { get_taskeditor_params } from "./taskstatus";

export default () => {
  const route = useNavigate();
  const [task, setTask] = useState<Task_interface>({
    task_name: "新任务", start_time: new Date(), end_time: addMinutes(new Date(), 60), remaind_offset_minutes: 0
  });
  useEffect(() => {
    const params = get_taskeditor_params()
    if (params === null) {
      console.warn("空参数,不合法的任务编辑")
      route("/dayplan"); return;
    }
    (async function () {
      // 修改时,从后端获取被改的task信息
      if (params.operation === "modify") {
        const body: POST_task = { operation: "get", data: { id: params.task_id } }
        const data:Task_interface = (await axios.post(`${API_URL}/api/task/`, body)).data;
        setTask({...data,start_time:new Date(data.start_time),end_time:new Date(data.end_time)})
      }// 添加任务时,从params读.添加的哪个小时的
      else if (params.operation === "add") {
        setTask({ ...task, start_time: params.start_time, end_time: addMinutes(params.start_time, 60) })
      }
    })()
  }, [])
  const save_task = async () => {
    const params = get_taskeditor_params()
    if (params === null) {
      console.warn("空参数,不合法的任务编辑,保存提交拒绝")
      route("/dayplan"); return;
    }
    if (params.operation === 'add') {
      const body: POST_task = { operation: 'add', data: task, }
      axios.post(`${API_URL}/api/task/`, body)
    }
    else if (params.operation === 'modify') {
      const body: POST_task = { operation: "modify", data: task, task_id: params.task_id };
      axios.post(`${API_URL}/api/task/`, body)
    }
  }
  return <div className={styles['container']}>
    <header>创建任务</header>
    <main className={styles['main']}>
      <section>
        <input onChange={e => setTask({ ...task, task_name: e.target.value })} value={task?.task_name} className={styles['input']} type="text" placeholder="创建事件标题" />
      </section>
      <section className={styles['flex-section']}>
        <label htmlFor="start_time">开始时间</label>
        <input value={format(task.start_time, "yyyy-MM-dd\'T\'HH:mm")} onChange={e => setTask({ ...task, start_time: new Date(e.target.value) })} name="start_time" className={styles['time-input']} type="datetime-local" />
      </section>
      <section className={styles['flex-section']}>
        <label htmlFor="start_time">结束时间</label>
        <input value={format(task.end_time, "yyyy-MM-dd\'T\'HH:mm")} onChange={e => setTask({ ...task, end_time: new Date(e.target.value) })} name="start_time" className={styles['time-input']} type="datetime-local" />
      </section>
      <section className={styles['flex-section']}>
        <label htmlFor="">开始前</label>
        <input onChange={e => {
          const min = parseInt(e.target.value);
          if (min < 0) return
          setTask({ ...task, remaind_offset_minutes: min })
        }} value={task.remaind_offset_minutes} type="number" className={styles['input']} style={{ width: '200px' }} />提醒
      </section>
      <section>
        <textarea placeholder="请输入地点" value={task.location} onChange={e => setTask({ ...task, location: e.target.value })} className={styles['textarea']} name="location" id="location"></textarea>
      </section>
      <section>
        <textarea placeholder="请输入备注" value={task.remark} onChange={e => setTask({ ...task, remark: e.target.value })} className={styles['textarea']} name="remark" id="remark"></textarea>
      </section>
      <section>
        <button onClick={() => {
          save_task(); route("/dayplan")
        }}>确认</button>
        <button onClick={() => { route("/dayplan") }}>取消</button>
      </section>
    </main>
    <footer></footer>
  </div>
}