'use client'
import { useState } from "react";
import { Task_interface } from "@fc-task/common";
import { day_plants } from "@/global/day_plans";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
export default function TaskForm() {
  const router = useRouter()
  const [task, setTask] = useState<Task_interface>({
    task_name: "",
    start_time: new Date(),
    end_time: new Date(),
    remaind_offset_minutes: 0,
    location: "",
    remark: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    
    const { name, value } = e.target;
    if (name === "start_time" || name === "end_time") {
      // 将时间字符串（HH:MM）转换为完整的日期时间
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date(task.start_time);
      date.setHours(hours, minutes, 0); // 设置小时和分钟，秒数设置为0
      setTask((prevTask) => ({
        ...prevTask,
        [name]: new Date(date),
      }));
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    day_plants.add(task);
    router.push("/day_plan")
    console.log(day_plants.baket);
    
    // 这里可以将任务数据发送到服务器或其他逻辑处理
  };

  return (
    <div className="container">
      <h1 className="title">Task Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="task_name" className="label">
            Task Name:
          </label>
          <input
            type="text"
            id="task_name"
            name="task_name"
            value={task.task_name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_time" className="label">
            Start Time:
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={format(task.start_time, "HH:mm")}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_time" className="label">
            End Time:
          </label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={task.end_time.toISOString().slice(0, 16)}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remaind_offset_minutes" className="label">
            Reminder Offset (minutes):
          </label>
          <input
            type="number"
            id="remaind_offset_minutes"
            name="remaind_offset_minutes"
            value={task.remaind_offset_minutes}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="label">
            Location (optional):
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={task.location}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remark" className="label">
            Remark (optional):
          </label>
          <textarea
            id="remark"
            name="remark"
            value={task.remark}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>
        <button type="submit" className="button">
          Submit Task
        </button>
        <button onClick={()=>{
          router.push("/day_plan")
        }}>back</button>
      </form>
    </div>
  );
}

// 定义样式
const styles = `
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }

  .input, .textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }

  .textarea {
    resize: vertical;
    min-height: 100px;
  }

  .button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  .button:hover {
    background-color: #0056b3;
  }
`;

// 将样式注入到文档中
// import { useEffect } from "react";

// export function addGlobalStyle() {
//   const style = document.createElement("style");
//   style.type = "text/css";
//   style.innerHTML = styles;
//   document.head.appendChild(style);
// }

// useEffect(() => {
//   addGlobalStyle();
// }, []);