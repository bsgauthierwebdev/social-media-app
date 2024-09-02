import React from 'react'
import './sidebar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRss, faComments, faVideo, faUserGroup, faBookmark, faCircleQuestion, faBriefcase, faCalendarDays, faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import CloseFriends from '../closeFriends/CloseFriends'
import { Users } from '../../dummyData'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faRss} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faComments} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Comments</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faVideo} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faUserGroup} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faBookmark} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faCircleQuestion} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faBriefcase} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faCalendarDays} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon = {faGraduationCap} className = 'sidebarIcon' />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className = 'sidebarHr' />
        <ul className="sidebarFriendList">
          {Users.map(u => (
            <CloseFriends key = {u.id} user = {u} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar