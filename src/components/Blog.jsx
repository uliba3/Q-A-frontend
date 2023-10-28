import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }
  //const showWhenOwner = { display: (blog.user === undefined)||(typeof blog.user ==='string')||(blog.user.username === user.username) ? '' : 'none' }
  const showWhenOwner = { display: blog.user.username === user.username ? '' : 'none' }
  const toggleView = () => {
    setView(!view)
  }
  //console.log(blog,user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLike = (event) => {
    event.preventDefault()
    updateBlog({
      ...blog,
      likes: blog.likes+1
    })
  }
  const eraseBlog = (event) => {
    event.preventDefault()
    window.confirm('Do you really want to delete?')
    deleteBlog(blog)
  }
  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>{blog.title}<button id="view-button" onClick={toggleView}>view</button></div>
      <div style={showWhenVisible}>
        {blog.title}<button onClick={toggleView}>hide</button><br/>
        {blog.url}<br/>
      likes {blog.likes}<button id="addLike" onClick={addLike}>likes</button><br/>
        {blog.author}
      </div>
      <button id="delete-button" style={showWhenOwner} onClick={eraseBlog}>delete</button>
    </div>
  )}

export default Blog