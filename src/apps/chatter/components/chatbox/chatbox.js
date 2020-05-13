import './chatbox.less'
import React, { useState } from 'react'
import { Message } from '/elements/message'
import { useRoom } from '../../hooks/use-room'

export const ChatBox = ({ roomId }) => {
  const [textInput, setTextInput] = useState('')
  const [messages, sendNewMessage] = useRoom(roomId)

  const handleSend = () => {
    sendNewMessage(textInput)
    setTextInput('')
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='chatbox-component'>

      {messages.map((entry) => <Message content={entry.text} author={entry.author} timestamp={entry.timestamp} />)}

      <input id='chatbox-message-input'
        type='text'
        size='100'
        value={textInput}
        onChange={handleInputChange} />

      <button className='btn' onClick={handleSend} disabled={textInput === ''} >Send</button>
    </div>
  )
}
