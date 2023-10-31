import { useState } from 'react'
import styles from '../mystyle.module.css'
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
    <div className={`${styles.modern} ${styles.modernCardTA}`}>
      <div className={`${styles.modern} ${styles.modernTitle}`}>{topic.title}</div>
      <form onSubmit={addAnswer} className={`${styles.modern}`}>
        <textarea
          id="answer"
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
          className={`${styles.modern} ${styles.modernInput} ${styles.modernContentInput}`}
          rows="6" // Set the number of visible rows
          cols="40" // Set the number of visible columns
        />
        <button id="submit-button" type="submit" className={`${styles.modern} ${styles.modernButton}`}>save</button>
      </form>
    </div>
  )
}

export default AnswerForm