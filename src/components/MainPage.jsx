import { useEffect, useState } from 'react'
import Switchable from './Switchable'
import TAcard from './TAcard'
import answerService from '../services/answers'
import topicService from '../services/topics'
import AnswerForm from './AnswerForm'
import styles from '../mystyle.module.css'

const MainPage = ({
  logOut,
  user
}) => {
  const [viewmode, setViewmode] = useState(true)
  const [topic, setTopic] = useState(null)
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    console.log('Mainpage load')
    getRandomTopicAnswer()
  }, [])

  const getRandomTopicAnswer = async () => {
    try {
      console.log('getRandomTopicAnswer')
      const randomTopic = await topicService.getRandom()
      setTopic(randomTopic)
      await getRandomAnswer(randomTopic)
    } catch (exception){
      console.log(exception)
    }
  }

  const getRandomAnswer = async topic => {
    try {
      console.log('topic: ', topic)
      const randomAnswer = await answerService.getRandByTopic(topic)
      setAnswer(randomAnswer)
    } catch (exception){
      console.log(exception)
    }
  }
  return (
    <>
      <button onClick={logOut} className={`${styles.modern} ${styles.upperCenter} ${styles.modernButton}`}>x</button>
      <div className={`${styles.parent} ${styles.modern} ${styles.modernCard}`}>
        <Switchable leftButtonLabel="view" rightButtonLabel="create">
          {topic && answer &&
            <TAcard topic={topic} answer={answer}
              getRandomAnswer={getRandomAnswer}
              getRandomTopicAnswer={getRandomTopicAnswer}/>}
          {topic && user &&
            <AnswerForm topic={topic} user={user}/>}
        </Switchable>
      </div>
    </>
  )
}

export default MainPage