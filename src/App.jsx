import { useState, useEffect, useRef } from 'react'
import styles from './mystyle.module.css'
import loginService from './services/login'
import answerService from './services/answers'
import topicService from './services/topics'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Switchable from './components/Switchable'
import Togglable from './components/Togglable'
import MainPage from './components/MainPage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    console.log('initial load')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      answerService.setToken(user.token)
      topicService.setToken(user.token)
    }
  }, [])

  const handleSignup = async (event) => {
    event.preventDefault()
    try{
      await userService.create({
        username, password
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('signup failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      answerService.setToken(user.token)
      topicService.setToken(user.token)
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

  const accountForm = () => (
    <div className={`${styles.parent} ${styles.modern}`}>
      <Switchable leftButtonLabel="log in" rightButtonLabel="sign up">
        <LoginForm
          handleLogin={handleLogin}
          handleSetUsername={({ target }) => setUsername(target.value)}
          username={username}
          handleSetPassword={({ target }) => setPassword(target.value)}
          password={password}
        />
        <SignupForm
          handleSignup={handleSignup}
          handleSetUsername={({ target }) => setUsername(target.value)}
          username={username}
          handleSetPassword={({ target }) => setPassword(target.value)}
          password={password}
        />
      </Switchable>
      {errorMessage}{successMessage}
    </div>
  )

  return (
    <>
      {!user && accountForm()}
      {user &&
      <MainPage
        logOut={logOut} user={user}
      />}
    </>
  )
}

export default App