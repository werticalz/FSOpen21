import React, { useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
    })
    setTitle('')
    setAuthor('')
    setURL('')
    setLikes('')
  }
  return (
    <Togglable buttonLabel='Add a blog post'>
      <form className='add_blog_form' onSubmit={handleAddBlog} >
        <div>
          Heading:
          <input
            id='title'
            type='text'
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            id='url'
            type='text'
            name='URL'
            value={url}
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type='text'
            name='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Likes:
          <input
            id='likes'
            type='number'
            name='Likes'
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id='submit_new_blog' type='submit'>Save</button>
      </form >
    </Togglable>
  )
}

export default BlogForm