import React from "react"
import { Link } from "react-router-dom"

function Home () {
  return <div onClick={() => console.log("hello")}>
    Home Works

    <Link to="/list"> 跳转到List</Link>
  </div>
}

export default Home