import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhotoFilm, faTag, faLocationDot, faFaceSmile} from '@fortawesome/free-solid-svg-icons'
import './share.css'

const Share = () => {
  return (
    <div className="shareContainer">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
                <input 
                    placeholder = "What's on your mind?" 
                    className="shareInput" 
                />
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <FontAwesomeIcon style = {{color: 'tomato'}} className = 'shareIcon' icon = {faPhotoFilm} />
                        <span className = 'shareOptionText'>Photo or Video</span>
                    </div>
                    <div className="shareOption">
                        <FontAwesomeIcon style = {{color: 'blue'}} className = 'shareIcon' icon = {faTag} />
                        <span className = 'shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        <FontAwesomeIcon style = {{color: 'green'}} className = 'shareIcon' icon = {faLocationDot} />
                        <span className = 'shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        <FontAwesomeIcon style = {{color: 'goldenrod'}} className = 'shareIcon' icon = {faFaceSmile} />
                        <span className = 'shareOptionText'>Feelings</span>
                    </div>
                </div>
                <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}

export default Share