import React from 'react'
import {Link} from "react-router-dom"

const Hero = () => {
  return (
    <div>
      <h1 >Hero</h1>
      <Link to={"/home"}>home</Link>
    </div>
  )
}

export default Hero
