import './chatbox.less'
import React, { useState, useEffect } from 'react'
import url from '/util/url'

export const ChatBox = ({ roomId, ...props }) => {
  const [messageInput, setMessageInput] = useState('')
  const [chatLog, setChatLog] = useState('')
  const [chatSocket, setChatSocket] = useState()
  // const socketRef = useRef()

  const handleSend = () => {
    // socketRef.current.send(messageInput)
    chatSocket.send(messageInput)
    setMessageInput('')
  }

  const handleChange = (e) => {
    setMessageInput(e.target.value)
  }

  useEffect(() => {
    console.log('Connecting new websocket to ' + url('api_ws.chatSocket', { args: { id: roomId } }))
    const newSocket = new window.WebSocket(
      url('api_ws.chatSocket', { args: { id: roomId } })
    )

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      setChatLog((previous) => previous + data.message + '\n')
    }

    newSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly')
    }
    setChatSocket(newSocket)
    // socketRef.current = newSocket
    // return () => {
    //   console.log('Socket cleanup?')
    // }
  }, [])

  return (
    <div className='chatbox-component'>
      <textarea
        rows={20}
        cols={100}
        name={'ChatBox'}
        value={chatLog}
        {...props}
      />

      <input id='chatbox-message-input' type='text' size='100'
        value={messageInput}
        onChange={handleChange} />

      <button className='btn' onClick={handleSend}>Primary</button>
    </div>
  )
}
