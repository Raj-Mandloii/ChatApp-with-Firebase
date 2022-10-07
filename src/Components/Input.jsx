import React from 'react'
import openFile from "../assets/openFile.png"
import attach from "../assets/attach.png"
export const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type Something .....'/>
      <div className="send"></div>
      <img src={attach} alt="" />
      <input type="file" style={{display:"none"}} id="file"/>
      <label htmlFor="file">
        <img src={openFile} alt="" />
      </label>
      <button>Send</button>
    </div>
  )
}
