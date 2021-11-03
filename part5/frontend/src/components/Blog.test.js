import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

let component
const blog = {
  title: 'Testblog',
  author: 'Me',
  url: 'www.test.com',
  likes: 112
}

afterEach(() => {
  component.unmount()
})

describe('Initially blogs:', () => {
  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })
  test('renders title and author in the form "{title} by {author},"', () => {
    const divTitle = component.container.querySelector('.blog--title')
    expect(divTitle).toHaveTextContent('Testblog by Me')
  })
  test('does not render url and likes', () => {
    const component = render(<Blog blog={blog} />)
    const divText = component.container.querySelector('.blog--text')
    expect(divText).toBeDefined()
    expect(divText).not.toHaveTextContent('www.test.com')
  })
})

describe('View button:', () => {
  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })
  test('exists', () => {
    const viewButton = component.getByText('view')
    expect(viewButton).toBeDefined()
  })

  test('after clicking renders also url and likes', async () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const divText = component.container.querySelector('.blog--text')
    expect(divText).toBeDefined()
    expect(divText).toHaveTextContent('www.test.com')
    expect(divText).toHaveTextContent('112 likes')
  })
})

describe('Like button:', () => {
  let likeButton
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(<Blog blog={blog} increaseLikesByOne={mockHandler} />)
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    likeButton = component.getByText('Like')
  })

  test('exists', () => {
    expect(likeButton).toBeDefined()
  })

  test('If clicked twice makes two calls to adding likes', () => {
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})