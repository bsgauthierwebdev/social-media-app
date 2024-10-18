import React from 'react'
import {Link} from 'react-router-dom'
import './topbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faUser, faComments, faBell} from '@fortawesome/free-solid-svg-icons'

const Topbar = () => {
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to = '/' style = {{textDecoration: 'none'}}>
            <span className="logo">SocialMediaApp</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <FontAwesomeIcon icon={faMagnifyingGlass} className = 'searchIcon' />
            <input placeholder = 'Search for friends, posts or videos' className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <FontAwesomeIcon icon = {faUser} />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <FontAwesomeIcon icon = {faComments} />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <FontAwesomeIcon icon = {faBell} />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </div>
    </div>
  )
}

export default Topbar