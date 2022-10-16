import React from 'react';
import {Sidebar} from "../Components/Sidebar.jsx"
import {Chat} from "../Components/Chat.jsx"

export const Home = () => {
  // console.log("HHHHHOOOOOOOMMMMMMMMEEEEEEEE")
  return (
    <div className='home'>
        <div className='container'>
          <Sidebar/>
          <Chat/>

        </div>
    </div>
  )
}
