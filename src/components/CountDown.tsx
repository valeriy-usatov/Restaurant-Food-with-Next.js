"use client"

import Countdown from "react-countdown"

const endingDate = new Date("2025-03-21")

const CountDown = () => {
  return (
    <Countdown className="font-bold text-5xl text-yellow-300" date={endingDate}/>
  )
}

export default CountDown