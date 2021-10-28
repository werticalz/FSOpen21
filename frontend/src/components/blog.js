import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author} @ {blog.url} ({blog.likes} likes)
  </div>  
)

export default Blog