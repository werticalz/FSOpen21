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
      .then((blogs) => setBlogs(blogs))
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
      console.log(exception)
      setMessage({
        text: 'Unable to add this blog',
        type: 'error'
      })
    }
  }

  const removeBlog = async (id, title) => {
    const confirmation = window.confirm(`Remove ${title}?`)
    if (confirmation) {
      try {
        let response = await blogService.remove(id)
        setMessage({
          type: 'success',
          text: `Succesfully removed ${title} from the list`
        })
        response = await blogService.getAll()
        setBlogs(response)
      } catch (exception) {
        console.log(exception)
        setMessage({
          type: 'error',
          text: 'Unfortunately something went wrong and we were not able to remove this blog'
        })
      }
    }
  }


  const increaseLikesByOne = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      let returnedBlog = await blogService.update(id, changedBlog)
      let response = await blogService.getAll()
      setBlogs(response)
      setMessage({
        type: 'success',
        text: `Added a like to ${returnedBlog.title}`
      })
    } catch (exception) {
      console.log(exception)
      setMessage({
        text: `Blog with id ${id} cannot be found`,
        type: 'error'
      })
    }
  }

  const login = async (userObject) => {
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
      console.log(exception)
      setMessage({
        text: 'Wrong username & password combination',
        type: 'error',
      })
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
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
          <p>Logged in as {user.name}</p>
          <button className='button' onClick={handleLogout}>Logout</button>
          <BlogForm addBlog={addBlog} />
        </div>}
      <h2>Blogs:</h2>
      {blogs.sort((x, y) => (x.likes > y.likes ? -1 : 1)) && blogs.map((blog) =>
        <Blog increaseLikesByOne={increaseLikesByOne} blog={blog} user={user} removeBlog={removeBlog} />
      )}
    </div>
  )
}


export default App