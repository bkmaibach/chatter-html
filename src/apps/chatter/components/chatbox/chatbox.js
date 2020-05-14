import './chatbox.less'
import React, { useState, useEffect } from 'react'
import { Message } from '/elements/message'
import { useRoom } from '../../hooks/use-room'

export const ChatBox = ({ roomId }) => {
  const [textInput, setTextInput] = useState('')
  const [messages, sendNewMessage] = useRoom(roomId)

  useEffect(() => {
    document.querySelector('#chatbox__message-input').focus()
    document.querySelector('#chatbox__message-input').onkeyup = function (e) {
      if (e.keyCode === 13) {
        document.querySelector('.chatbox__send-button').click()
      }
    }
  }, [])

  const handleSend = () => {
    sendNewMessage(textInput)
    setTextInput('')
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='chatbox'>

      {messages.map((entry) => <Message content={entry.text} author={entry.author} timestamp={entry.timestamp} />)}

      <div className='chatbox__input-row'>
        <input id='chatbox__message-input'
          type='text'
          size='100'
          value={textInput}
          onChange={handleInputChange} />

        <button className='chatbox__send-button btn' onClick={handleSend} disabled={textInput === ''} >Send</button>
      </div>
    </div>
  )
}
