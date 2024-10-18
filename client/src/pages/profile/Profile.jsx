import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './profile.css'

const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img 
                        src="assets/post/3.jpeg" 
                        alt="" 
                        className="profileCoverImg" 
                    />
                    <img 
                        src="assets/person/7.jpeg" 
                        alt="" 
                        className="profileUserImg" 
                    />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">User Name</h4>
                    <p className="profileInfoDesc">User Description</p>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed />
                <Rightbar profile />
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile