import './chatbox.less'
import React, { useState, useEffect } from 'react'
import url from '/util/url'

export const ChatBox = ({ roomId }) => {
  const [messageInput, setMessageInput] = useState('')
  const [chatLog, setChatLog] = useState('')
  const socketRef = useRef()

  const handleSend = () => {
    // socketRef.current.send(messageInput)
    const toSend = JSON.stringify({ message: messageInput })
    socketRef.current.send(toSend)
    setMessageInput('')
  }

  const handleChange = (e) => {
    setMessageInput(e.target.value)
  }

  useEffect(() => {
    console.log('Connecting new websocket to ' + url('api_ws.chatSocket', { args: { id: roomId } }))
    socketRef.current = new window.WebSocket(
      url('api_ws.chatSocket', { args: { id: roomId } })
    )

    socketRef.current.onmessage = (e) => {
      console.log('ONMESSAGE WITH DATA ' + e.data)
      const data = JSON.parse(e.data)
      setChatLog((previous) => previous + data.message + '\n')
    }

    socketRef.current.onclose = (e) => {
      console.error('Chat socket closed unexpectedly')
    }

    return () => {
      socketRef.current.close()
    }
  }, [])

  return (
    <div className='chatbox-component'>
      <textarea
        rows={20}
        cols={100}
        name={'ChatBox'}
        value={chatLog}
      />

      <input id='chatbox-message-input'
        type='text'
        size='100'
        value={messageInput}
        onChange={handleChange} />

      <button className='btn' onClick={handleSend} disabled={messageInput == ''} >Send</button>
    </div>
  )
}
