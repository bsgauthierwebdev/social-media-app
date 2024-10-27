import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
// import { Posts } from '../../dummyData'

const Feed = ({username}) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get('/posts/timeline/1')
        setPosts(res.data)
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchPosts()
  }, [username])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key = {p.post_id} post = {p} />
        ))}
      </div>
    </div>
  )
}

export default Feed