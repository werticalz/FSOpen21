import React, { useState, useEffect } from 'react'
import Blog from './components/blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setMessage({
        text: `Added blog ${response.title}`,
        type: 'success'
      })
    } catch (exception) {
      setMessage({
        text: 'Unable to add this blog',
        type: 'error'
      })
    }
  }


  const increaseLikesByOne = id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
      .catch(error => {
        setMessage({
          text: `Blog ${blog.title} cannot be found`,
          type: 'error'
        })
      })
  }

  const login = async (userObject) => {
    console.log('Handlelogin')
    console.log(userObject)
    try {
      const user = await loginService.login(userObject)
      
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user.username)
      setMessage({
        text: `Logged in as ${user.name}`,
        type: 'success',
      })
    } catch (exception) {
      setMessage({
        text: 'Wrong username & password combination',
        type: 'error',
      })
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('Logout requested')
    setUser(null)
    setMessage({
      text: `Just logged out! See you soon.`,
      type: 'success'
    })
  }




  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user === null ?
        <LoginForm
          login={login}

        /> :
        <div>
          <p>logged in as {user.name}<button onClick={handleLogout}>Logout</button></p>
          <BlogForm addBlog={addBlog} />
        </div>}
      <h2>Blogs:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App