import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { addNotification } from './reducers/notificationReducer'
import { addBlog, initialize } from './reducers/blogReducer'
const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('initializing blogs')
    dispatch(initialize())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addB = (blogObject) => {
    try {
      dispatch(addBlog(blogObject))
      dispatch(addNotification({
        text: `Added blog ${blogObject.title}`,
        type: 'success'
      }))
    } catch (exception) {
      console.log(exception)
      dispatch(addNotification({
        text: 'Unable to add this blog',
        type: 'error'
      }))
    }
  }

  /*const removeBlog = (id, title) => {
    const confirmation = window.confirm(`Remove ${title}?`)
    if (confirmation) {
      try {
        dispatch()
        let response = await blogService.remove(id)
        dispatch(addNotification({
          type: 'success',
          text: `Succesfully removed ${title} from the list`
        }))
        response = await blogService.getAll()
        setBlogs(response)
      } catch (exception) {
        console.log(exception)
        dispatch(addNotification({
          type: 'error',
          text: 'Unfortunately something went wrong and we were not able to remove this blog'
        }))
      }
    }
  }


  const increaseLikesByOne = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(id, changedBlog)
      let response = await blogService.getAll()
      setBlogs(response)
      dispatch(addNotification({
        type: 'success',
        text: `Added a like to ${blog.title}`
      }))
    } catch (exception) {
      console.log(exception)
      dispatch(addNotification({
        text: `Blog with id ${id} cannot be found`,
        type: 'error'
      }))
    }
  }*/

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user.username)
      window.location.reload(false)
      dispatch(addNotification({
        text: `Logged in as ${user.name}`,
        type: 'success',
      }))
    } catch (exception) {
      dispatch(addNotification({
        text: 'Wrong username & password combination',
        type: 'error',
      }))
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(addNotification({
      text: 'Just logged out! See you soon.',
      type: 'success'
    }))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ?
        <LoginForm
          login={login}

        /> :
        <div>
          <p>Logged in as {user.name}</p>
          <button className='button' onClick={handleLogout}>Logout</button>
          <BlogForm addBlog={addB} />
        </div>}
      <h2>Blogs:</h2><div className='blogs'>
        {console.log(blogs)}
        {blogs.sort((x, y) => (x.likes > y.likes ? -1 : 1)) && blogs.map((blog) =>
          <Blog key={blog.id} /*increaseLikesByOne={increaseLikesByOne}*/ blog={blog} user={user} /*removeBlog={removeBlog}*/ />
        )}
      </div>
    </div>
  )
}


export default App