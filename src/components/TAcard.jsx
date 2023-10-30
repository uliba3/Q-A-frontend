import { useEffect, useState } from 'react'

const TAcard = ({
  topic,
  answer,
  user
}) => {
  return (
    <div>
      <div>{user.username}</div>
      <div>{topic.title}</div>
      <div>{answer.content}</div>
    </div>
  )
}

export default TAcard