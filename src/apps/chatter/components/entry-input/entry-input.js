import { useState, useEffect, useRef } from 'react'

import './entry-input.less'

export const EntryInput = ({ onSend }) => {
  const [textInput, setTextInput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
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
  }

  const handleInputChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='entry-input__input-row'>
      <textarea
        id='entry-input__text-input'
        ref={inputRef}
        type='text'
        rows={5}
        placeholder={'Type a message here...'}
        value={textInput}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />

      <button
        className='entry-input__send-button btn'
        onClick={send}
        disabled={textInput === ''}
      >
        Send
      </button>
    </div>
  )
}
