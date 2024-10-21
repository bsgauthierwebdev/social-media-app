import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
// import { Users } from '../../dummyData'
import './post.css'

const Post = ({post}) => {
    // console.log(post)
    // const user = Users.filter(u => u.id === 1)

    // console.log(user[0].username)
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`users/${post.user_id}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.user_id])

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
                        // src = {Users.filter(u => u.id === post.userId)[0].profilePicture} 
                        src = {user.profile_img || PF + 'person/noAvatar.png'}
                        alt="" 
                        className="postProfileImg" 
                    />
                    <span className="postUsername">
                        {/* {Users.filter(u => u.id === post.userId)[0].username} */}
                        {user.username}
                    </span>
                    {/* <span className="postDate">{post.date}</span> */}
                    <span className="postDate">{format(post.created_at)}</span>
                </div>
                <div className="postTopRight">
                    <FontAwesomeIcon icon = {faEllipsisVertical} />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.content}</span>
                <img src={PF + post?.image_url} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img 
                        src={`${PF}like.png`} 
                        alt="" className="likeIcon"
                        onClick = {likeHandler} 
                    />
                    <img 
                        src={`${PF}heart.png`} 
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