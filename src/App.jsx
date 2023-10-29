import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import answerService from './services/answers'
import topicService from './services/topics'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Switchable from './components/Switchable'
import Togglable from './components/Togglable'
import TAcard from './components/TAcard'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [topic, setTopic] = useState(null)
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    console.log('initial load')
    getRandomTopicAnswer()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    console.log('user load')
    getRandomTopicAnswer()
  }, [user])

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
    <>
      <div>account</div>
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
    </>
  )

  const getRandomTopicAnswer = async () => {
    try {
      const randomTopic = await topicService.getRandom()
      setTopic(randomTopic)
      await getRandomAnswer(randomTopic)
    } catch (exception){
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const getRandomAnswer = async topic => {
    try {
      console.log('topic: ', topic)
      const randomAnswer = await answerService.getRandByTopic(topic)
      setAnswer(randomAnswer)
    } catch (exception){
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!user && accountForm()}
      {user && <button onClick={logOut}>logOut</button>}
      {topic && answer && user &&
      <TAcard
        getRandomTopicAnswer={getRandomTopicAnswer}
        getRandomAnswer={getRandomAnswer}
        topic={topic} answer={answer} user={user}
      />}
      {errorMessage}{successMessage}
    </div>
  )
}

export default App