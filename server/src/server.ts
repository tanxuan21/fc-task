import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import "./ws"
import { POST_task, Task_interface } from '@fc-task/common';
import objectHash from 'object-hash';
import { TasksInstance } from './database/Task';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// 获取所有的 task id
app.get(`/api/taskid/`, (req, res) => {
  res.json(TasksInstance.data.ids)
})

app.post(`/api/task/`, (req, res) => {
  const body = req.body as POST_task;
  console.log(body);
  
  if (body.operation === 'get') {
    res.json({
      data: `请求${body.data.id}数据`
    })
  }
  else if (body.operation === 'save') {
    TasksInstance.add_task(body.data)
    res.json({
      success:true,
    })
  }
})
