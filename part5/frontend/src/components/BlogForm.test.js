import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('Adding a new blog via <BlogForm />:', () => {
  let addBlog
  let component

  beforeEach(() => {
    addBlog = jest.fn()
    component = render(<BlogForm addBlog={addBlog} />)
  })

  afterEach(() => {
    component.unmount()
  })

  test('updates parent state and calls onSubmit', () => {
    const testBlog = {
      title: 'Adding blog is rather easy',
      author: 'ConstantBlogger123',
      url: 'www.blogspace.com',
      likes: 124
    }
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const likes = component.container.querySelector('#likes')
    const form = component.container.querySelector('.add_blog_form')

    fireEvent.change(title, { target: { value: testBlog.title } })
    fireEvent.change(author, { target: { value: testBlog.author } })
    fireEvent.change(url, { target: { value: testBlog.url } })
    fireEvent.change(likes, { target: { value: testBlog.likes } })
    fireEvent.submit(form)
    //Change blog likes to string because it is converted to a string in the mock
    testBlog.likes = '124'
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toMatchObject(testBlog)
  })
})