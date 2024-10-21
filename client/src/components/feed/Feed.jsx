import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
// import { Posts } from '../../dummyData'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('posts/timeline/1')
      // console.log(res)
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

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