import blogService from "../services/blogs"

const initBlogs = async () => {
  return await blogService.getAll()
}

export function addBlog(blog) {
  return async dispatch => {
    const response = await blogService
      .create(blog)
    dispatch({ type: 'ADD', data: response })
  }
}

export function deleteBlog(blog) {
  return async dispatch => {
    const response = await blogService
      .remove(blog.id)
    dispatch({ type: 'REMOVE', data: response })
  }
}

export function voteBlog(blog) {
  const blogs = initBlogs()
  const blogById = blogs.find(b => b.id === blog.id)
  const changedBlog = { ...blogById, likes: blogById.likes + 1 }
  return async dispatch => {
    await blogService
      .update(blog.id, changedBlog)
    dispatch({ type: 'LIKE', data: null })
  }
}

export function initialize() {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch({ type: 'INIT', data: response })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD':
      return [...state, action.data]
    case 'REMOVE':
      return initBlogs()
    case 'VOTE':
      return initBlogs()
    default:
      return state
  }

}

export default reducer