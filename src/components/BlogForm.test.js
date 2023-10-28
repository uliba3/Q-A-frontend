import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(input[0], 'testing a title...')
  await user.type(input[1], 'testing a author...')
  await user.type(input[2], 'testing a url...')
  await user.click(sendButton)

  const testBlog = {
    title: 'testing a title...',
    author: 'testing a author...',
    url: 'testing a url...',
    likes: 0
  }

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(testBlog)
})