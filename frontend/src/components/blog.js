import React from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
const Blog = ({ increaseLikesByOne, blog, user, removeBlog }) => {
  let deleteButtonVisible = false

  if (user && blog) {
    deleteButtonVisible = blog.user.username === user.username ? true : false
  }

  const showDelete = {
    display: deleteButtonVisible ? '' : 'none'
  }


  return (
    <div className='blog' key={blog.id} >
      <div className='blog__title' key={blog.title}>{blog.title}</div>
      <Togglable buttonLabel='View' returnButtonLabel='Hide' id={blog.id}>
        {blog.author}  {<button style={showDelete} className='button button__small' onClick={() => removeBlog(blog.id, blog.title)}>Delete</button>}<br></br>
        {blog.url}<br></br>
        {blog.likes} likes <button className='button button__small' onClick={() => increaseLikesByOne(blog.id)}>Like </button>
        <br></br>
      </Togglable>
    </div >
  )
}

Blog.propTypes = {
  increaseLikesByOne: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog