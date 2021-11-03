import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ increaseLikesByOne, blog, user, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  let showDelete = false
  if (user) {
    showDelete = user.username === blog.user.username ? true : false
  }

  const showIfSameUser = { display: showDelete ? '' : 'none' }

  const showAllBlog = () => {
    return (
      <div>
        {blog.url}<br></br>
        {blog.likes} likes <button id='like_button' className='button button__small' onClick={() => increaseLikesByOne(blog.id)}>Like </button>
        {<button id='delete_button' style={showIfSameUser} className='button button__small button__red' onClick={() => removeBlog(blog.id, blog.title)}>Delete</button>}<br></br>
      </div>
    )
  }

  return (
    <div id='blog' className='blog' key={blog.id} >
      <div id='blog_title' className='blog--title' key={blog.title}>{blog.title} by {blog.author}&ensp;
        <button id='view_hide_button' onClick={() => setShowAll(!showAll)}>
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