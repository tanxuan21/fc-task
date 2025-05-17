'use client'
import "../styles/globals.scss"
import { useRouter } from "next/navigation"
import { useEffect, useReducer } from "react"

export default ()=>{
  const router = useRouter();
  useEffect(()=>{
    router.push("/day_plan")
  },[])
}