import { Link, useNavigate } from "react-router-dom"

export default ()=>{
    const nav = useNavigate();
    return <div>Home Page
        <Link to="/about">about</Link>
        <button onClick={()=>{nav("/about/")}}>点击跳转到about</button>
        为什么没有热更新?
    </div>
}