import { useEffect, useState } from 'react'
import answerService from '../services/answers'
import topicService from '../services/topics'

const TAcard = ({
  getRandomTopicAnswer,
  getRandomAnswer,
  topic,
  answer,
  user
}) => {
  useEffect(() => {
    getRandomTopicAnswer()
    console.log('TAcard load')
  }, [])
  return (
    <div>
      <div>{user.username}</div>
      <div>{topic.title}</div>
      <div>{answer.content}</div>
    </div>
  )
}

export default TAcard