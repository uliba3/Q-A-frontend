import { useState } from 'react'
import answerService from '../services/answers'

const AnswerForm = ({
  topic,
  user
}) => {
  const [newContent, setNewContent] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const addAnswer = async (event) => {
    event.preventDefault()
    try{
      await answerService.create({
        topic: topic.id,
        content: newContent
      })
      setNewContent('')
      setSuccessMessage('answer saved!!')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }catch(exception){
      console.log(exception)
      setErrorMessage('answer invalid')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <form onSubmit={addAnswer}>
      <div>
        Topic:
        <input
          id="title"
          value={topic.title}
          disabled
        />
      </div>
      <div>
        Answer:
        <input
          id="answer"
          value={newContent}
          onChange={event => setNewContent(event.target.value)}
        />
      </div>
      <button id="submit-button" type="submit">save</button>
    </form>
  )
}

export default AnswerForm