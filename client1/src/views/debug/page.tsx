'use client'
import axios from "axios"

export default () => {
    return <>
        <button onClick={async () => {
            // const data = (await axios.get("http://localhost:8000/api/tasksid/"))
            // console.log(data);
            console.log("click");
        }}>请求</button>
    </>
}