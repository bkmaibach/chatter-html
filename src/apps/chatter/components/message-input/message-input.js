import { useState, useEffect, useRef } from 'react'

import './message-input.less'

export const MessageInput = ({ onSend }) => {
  const [textInput, setTextInput] = useState('')
  const inputRef = useRef(null)

  const scheduleScroll = () => {
    console.log('Executing scroll')
    // Request for comments
    // Cant execute a scroll outright because new messages seem to
    // appear after everything, so the offsetTop or scroll height
    // can't be properly obtained for this action
    setTimeout(() => window.scrollTo(0, (inputRef.current.offsetTop)), 100)
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
    scheduleScroll()
  }, [])

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      send()
    }
  }

  const send = () => {
    onSend(textInput)
    inputRef.current && inputRef.current.focus()
    setTextInput('')
    scheduleScroll()
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='chatbox__input-row'>
      <input
        id='chatbox__message-input'
        ref={inputRef}
        type='text'
        size='100'
        value={textInput}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />

      <button
        className='chatbox__send-button btn'
        onClick={send}
        disabled={textInput === ''}
      >
        Send
      </button>
    </div>
  )
}
