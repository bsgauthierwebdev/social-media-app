import React from 'react'
import './closeFriends.css'

const CloseFriends = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div>
        <li className="sidebarFriend">
            <img src={PF + user.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    </div>
  )
}

export default CloseFriends