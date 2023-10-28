import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    getAllBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getAllBlogs = async () => {
    const Blogs = await blogService.getAll()
    setBlogs(Blogs.sort((a, b) => a.likes - b.likes).reverse())
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      await getAllBlogs()
      setSuccessMessage(
        `${blogObject.title} by ${user.username} added!!`
      )
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${blogObject.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService
        .update(blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog))
      setSuccessMessage(
        `Blog ${blogObject.title} was successfully updated`
      )
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot update blog ${blogObject.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      const deletedBlog = await blogService
        .erase(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      setSuccessMessage(
        `Blog ${blogObject.title} was successfully updated`
      )
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${blogObject.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        handleLogin={handleLogin}
        handleSetUsername={({ target }) => setUsername(target.value)}
        username={username}
        handleSetPassword={({ target }) => setPassword(target.value)}
        password={password}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new Blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage}{successMessage}
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in<button onClick={logOut}>logout</button></p>
        <h2>Create new</h2>
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}
      </div>
      }

    </div>
  )
}

export default App