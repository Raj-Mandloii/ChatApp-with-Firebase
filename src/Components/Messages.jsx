import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { Massage } from './Massage'

export const Messages = () => {
  const { data } = useContext(ChatContext)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unSub()
    }
  },[data.chatId])
  return (
    <div className='messages'>
      {messages.map(m=>(
        <Massage message={m} key={m.id}/>

      ))}
     
    </div>
  )
}
