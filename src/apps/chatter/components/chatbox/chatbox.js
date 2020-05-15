import { useState, useEffect, useRef } from 'react'

import { Message } from '/elements/message'
import { useRoom } from '/apps/chatter/hooks/use-room'
import './chatbox.less'

export const ChatBox = ({ roomId }) => {
  const [textInput, setTextInput] = useState('')
  const [messages, sendNewMessage] = useRoom(roomId)
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current && inputEl.current.focus()
  }, [messages])

  const handleSend = () => {
    console.log('sending')
    sendNewMessage(textInput)
    setTextInput('')
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSend()
    }
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='chatbox'>

      {messages.map(Message)}

      <div className='chatbox__input-row'>
        <input
          id='chatbox__message-input'
          ref={inputEl}
          type='text'
          size='100'
          value={textInput}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />

        <button
          className='chatbox__send-button btn'
          onClick={handleSend}
          disabled={textInput === ''}
        >
          Send
        </button>
      </div>
    </div>
  )
}
