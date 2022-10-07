import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Chat</span>
        <div className="user">
          <img src='https://raj-mandloii.github.io/raj-mandloi/static/media/profile.bc02411670caa5d19ea7.jpg' alt='' />
          <span>Raj</span>
          <button>Logout</button>
        </div>
    </div>
  )
}
