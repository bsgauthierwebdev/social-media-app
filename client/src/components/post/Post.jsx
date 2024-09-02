import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Users } from '../../dummyData'
import './post.css'

const Post = ({post}) => {
    // console.log(post)
    // const user = Users.filter(u => u.id === 1)

    // console.log(user[0].username)
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

  return (
    <div className="postContainer">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img 
                        src = {Users.filter(u => u.id === post.userId)[0].profilePicture} 
                        alt="" className="postProfileImg" 
                    />
                    <span className="postUsername">
                        {Users.filter(u => u.id === post.userId)[0].username}
                    </span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                    <FontAwesomeIcon icon = {faEllipsisVertical} />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.content}</span>
                <img src={post?.photo} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img 
                        src="assets/like.png" 
                        alt="" className="likeIcon"
                        onClick = {likeHandler} 
                    />
                    <img 
                        src="assets/heart.png" 
                        alt="" className="likeIcon"
                        onClick = {likeHandler} 
                    />
                    <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post