"use client"

import axios from "axios"
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const testAPI = async() =>{
    try{
      const response = await axios.get(`http://127.0.0.1:8003/api/hello`)
    setData(response.data.hello);
    }catch(error){
      console.error("apiエラー", error);
    }
    
  }
  useEffect(() => {
    testAPI(); // コンポーネントのマウント時にAPIを呼び出す
  }, []);
  return (
    <div>
      {data}
    </div>
  )
}
