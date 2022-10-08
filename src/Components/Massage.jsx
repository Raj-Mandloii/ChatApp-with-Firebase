import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

export const Massage = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  return (
    <div className='message owner'>
      {/* <div className="messageInfo ">
        <img src="https://raj-mandloii.github.io/raj-mandloi/static/media/profile.bc02411670caa5d19ea7.jpg" alt="" />
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src="https://raj-mandloii.github.io/raj-mandloi/static/media/profile.bc02411670caa5d19ea7.jpg" alt="" />

      </div> */}
    </div>
  )
}
 