import React from 'react'
import Togglable from './Togglable'
const Blog = ({ increaseLikesByOne, blog, user, removeBlog }) => {
  let deleteButtonVisible = false

  if (user && blog) {
    deleteButtonVisible = blog.user.username === user.username ? true : false
  }

  const showDelete = {
    display: deleteButtonVisible ? "" : "none"
  }


  return (
    <div className='blog' key={blog.id} >
      <div className='blog__title' key={blog.title}>{blog.title}</div>
      <Togglable buttonLabel='View' returnButtonLabel='Hide'>
        {blog.author}  {<button style={showDelete} className='button button__small' onClick={() => removeBlog(blog.id, blog.title)}>Delete</button>}<br></br>
        {blog.url}<br></br>
        {blog.likes} likes <button className='button button__small' onClick={() => increaseLikesByOne(blog.id)}>Like </button>
        <br></br>
      </Togglable>
    </div >
  )
}

export default Blog