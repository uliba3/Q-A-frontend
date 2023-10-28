import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'newTitle',
    author: 'newAuthor',
    url: 'newURL',
    likes: 0,
    user: 'user'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'newTitle'
  )
})

test('clicking the likes button calls event handler once', async () => {
  const blog = {
    title: 'newTitle',
    author: 'newAuthor',
    url: 'newURL',
    likes: 0,
    user: 'user'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('likes')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})