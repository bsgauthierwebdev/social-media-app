import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import './post.css'

const Post = () => {
  return (
    <div className="postContainer">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src="/assets/person/1.jpeg" alt="" className="postProfileImg" />
                    <span className="postUsername">User Name</span>
                    <span className="postDate">5 minutes ago</span>
                </div>
                <div className="postTopRight">
                    <FontAwesomeIcon icon = {faEllipsisVertical} />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">Hey, it's my first post!</span>
                <img src="/assets/post/1.jpeg" alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src="assets/like.png" alt="" className="likeIcon" />
                    <img src="assets/heart.png" alt="" className="likeIcon" />
                    <span className="postLikeCounter">32 people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">9 comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post