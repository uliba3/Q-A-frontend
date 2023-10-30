import { useState } from 'react'

const TopicAnswerForm = ({
  createAnswer,
  user
}) => {
  const [newContent, setNewContent] = useState('')
  const [newTopic, setNewTopic] = useState('')
  const addTopicAnswer = (event) => {
    event.preventDefault()
    createAnswer({
      content: newContent
    })
    setNewContent('')
  }
  return (
    <form onSubmit={addTopicAnswer}>
      <div>
        Topic:
        <input
          id="title"
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

export default TopicAnswerForm