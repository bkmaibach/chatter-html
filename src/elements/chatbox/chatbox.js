import './chatbox.less'
import React, { useState, useEffect, useRef } from 'react'
import { getState } from '/store'
import { Message } from '/elements/message'
import { WebSocketServiceInstance } from '/services/WebSocketService'

export const ChatBox = ({ roomId }) => {
  const [textInput, setTextInput] = useState('')
  const [chatLog, setChatLog] = useState([])
  const wssiRef = useRef()

  const setPreviousMessages = (messages) => {
    console.log('Setting previous messages ', { messages })
    setChatLog(messages)
  }

  const appendChatLog = (message) => {
    console.log('Appending using passed data: ', { message })
    setChatLog((previous) => previous.concat({ text: message.text, author: message.author, timestamp: message.timestamp }))
  }

  const waitForSocketConnection = (callback) => {
    setTimeout(
      function () {
        // Check if websocket state is OPEN
        if (WebSocketServiceInstance.state(roomId) === 1) {
          console.log('Connection is made')
          callback()
        } else {
          console.log('wait for connection...')
          waitForSocketConnection(callback)
        }
      }, 100) // wait 100 milisecond for the connection...
  }

  useEffect(() => {
    // console.log('Initializing websocket to room ' + roomId)
    wssiRef.current = WebSocketServiceInstance
    const { token } = getState()
    waitForSocketConnection(() => {
      wssiRef.current.initChatUser(roomId, token)
      wssiRef.current.addCallbacks(roomId, setPreviousMessages, appendChatLog)
      wssiRef.current.fetchMessages(roomId, token)
    })

    // Cleanup goes here...
    // return () => { }
  }, [])

  const handleSend = () => {
    const { token } = getState()
    console.log('Sending using token ', token)
    WebSocketServiceInstance.newChatMessage(roomId, textInput, token)
    setTextInput('')
  }

  const handleChange = (e) => {
    setTextInput(e.target.value)
  }

  return (
    <div className='chatbox-component'>

      {/* <textarea
        rows={20}
        cols={100}
        name={'ChatBox'}
        value={chatLog}
      /> */}
      {chatLog.map((entry) => <Message content={entry.text} author={entry.author} timestamp={entry.timestamp} />)}

      <input id='chatbox-message-input'
        type='text'
        size='100'
        value={textInput}
        onChange={handleChange} />

      <button className='btn' onClick={handleSend} disabled={textInput === ''} >Send</button>
    </div>
  )
}
