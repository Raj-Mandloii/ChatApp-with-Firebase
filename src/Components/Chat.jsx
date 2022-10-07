import React from 'react'
import add from "../assets/plus.png"
import camera from "../assets/camera.png"
import more from "../assets/more.png"
export const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Raj</span>
        <div className='chatIcons'>
          <img src={camera} alt='Camera'/>
          <img src={add} alt='Add'/>
          <img src={more} alt=''/>
        </div>
      </div>
    </div>
  )
}
