import React from 'react'
import { useState } from 'react'

export const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text"
          placeholder='Find a user'
          onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="userChat">
        <img src="https://raj-mandloii.github.io/raj-mandloi/static/media/profile.bc02411670caa5d19ea7.jpg" />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}
