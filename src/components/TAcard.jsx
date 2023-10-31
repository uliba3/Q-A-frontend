import { useEffect, useState } from 'react'
import styles from '../mystyle.module.css'
import userService from '../services/users'

const TAcard = ({
  topic,
  answer,
  getRandomAnswer,
  getRandomTopicAnswer
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
    <div className={`${styles.modern} ${styles.modernCardTA}`}>
      <div className={`${styles.modern} ${styles.modernTitle}`} onClick={getRandomTopicAnswer}>{topic.title}</div>
      <div className={`${styles.modern} ${styles.modernContent}`} onClick={() => getRandomAnswer(topic)}>{answer.content}</div>
      {user && <div className={styles.modernUsername}>by {user.username}</div>}
    </div>
  )
}

export default TAcard