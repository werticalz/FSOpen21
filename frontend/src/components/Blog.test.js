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
beforeEach(() => {
  component = render(<Blog blog={blog} />)
})

afterEach(() => {
  component.unmount()
})

describe('Initially blogs:', () => {
  test('Initially renders title and author in the form "{title} by {author},"', () => {
    const divTitle = component.container.querySelector('.blog--title')
    expect(divTitle).toHaveTextContent('Testblog by Me')
  })
  test('Initially does not render url and likes', () => {
    const component = render(<Blog blog={blog} />)
    const divText = component.container.querySelector('.blog--text')
    expect(divText).toBeDefined()
    expect(divText).not.toHaveTextContent('www.test.com')
  })
})

describe('Clicking view beside a blog', () => {

  test('The button with text "view" exists', () => {
    const viewButton = component.getByText('view')
    expect(viewButton).toBeDefined()
  })

  test('After clicking renders also url and likes', async () => {
    const mockHandler = jest.fn()
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const divText = component.container.querySelector('.blog--text')
    expect(divText).toBeDefined()
    expect(divText).toHaveTextContent('www.test.com')
    expect(divText).toHaveTextContent('112 likes')
  })
})




