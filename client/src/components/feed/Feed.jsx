import React, { useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'
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
        {/* {Posts.map(p => (
          <Post key = {p.id} post = {p} />
        ))} */}
        {posts.map((p) => (
          <Post key = {p.post_id} post = {p} />
        ))}
      </div>
    </div>
  )
}

export default Feed