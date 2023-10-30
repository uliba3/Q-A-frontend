import { useEffect, useState } from 'react'
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
      <button onClick={logOut}>log out</button>
      <button onClick={() => setViewmode(!viewmode)}>change mode</button>
      {viewmode && topic && answer && <>
        <TAcard topic={topic} answer={answer}/>
        <button onClick={() => getRandomAnswer(topic)}>same topic</button>
        <button onClick={() => getRandomTopicAnswer()}>different topic</button>
      </>}
      {!viewmode && <>
        <AnswerForm topic={topic} user={user}/>
      </>}
    </>
  )
}

export default MainPage