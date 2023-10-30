import { useEffect, useState } from 'react'
import styles from '../mystyle.module.css'
import userService from '../services/users'

const TAcard = ({
  topic,
  answer
}) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log('TAcard load')
    getUser()
  }, [answer])
  const userId = answer.user
  const getUser = async () => {
    try {
      const user = await userService.get({ userId })
      setUser(user)
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <div className={styles.modern}>
      {user && <div>{user.username}</div>}
      <div>{topic.title}</div>
      <div>{answer.content}</div>
    </div>
  )
}

export default TAcard