import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ increaseLikesByOne, blog, user, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  let deleteButtonVisible = false

  if (user && blog) {
    deleteButtonVisible = blog.user.username === user.username ? true : false
  }

  const showDelete = {
    display: deleteButtonVisible ? '' : 'none'
  }

  const showAllBlog = () => {
    return (
      <div>
        {blog.url}<br></br>
        {blog.likes} likes <button className='button button__small' onClick={() => increaseLikesByOne(blog.id)}>Like </button>
        {<button style={showDelete} className='button button__small button__red' onClick={() => removeBlog(blog.id, blog.title)}>Delete</button>}<br></br>
      </div>
    )
  }

  return (
    <div className='blog' key={blog.id} >
      <div className='blog--title' key={blog.title}>{blog.title} by {blog.author}&ensp;
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>
      <div className='blog--text' key={`bt${blog.id}`}>
        {showAll && showAllBlog()}
      </div>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number
  }),
}

Blog.defaultProps = {
  blog: {
    likes: 0
  }

}

export default Blog