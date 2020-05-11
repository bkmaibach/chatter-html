import './chatbox.less'
import React, { useState, useEffect, useRef } from 'react'
import url from '/util/url'
import { getState } from '/store'

export const ChatBox = ({ roomId }) => {
  const [messageInput, setMessageInput] = useState('')
  const [chatLog, setChatLog] = useState('')
  const socketRef = useRef()

  const handleSend = () => {
    const { token } = getState()
    console.log('USING TOKEN ' + token)
    const toSend = JSON.stringify({ text: messageInput, command: 'NEW_MESSAGE', token })
    socketRef.current.send(toSend)
    setMessageInput('')
  }

  const handleChange = (e) => {
    setMessageInput(e.target.value)
  }

  useEffect(() => {
    // Alternative: put token in querystring:
    // console.log('Connecting new websocket to ' + url('api_ws.chatSocket', { args: { id: roomId }, queries: { token: 'I AM TOKEN HI' }}))
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId } })
    console.log('Connecting new websocket to ' + socketUrl)
    socketRef.current = new window.WebSocket(socketUrl)

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log('ONMESSAGE: ', { data })
      setChatLog((previous) => previous + data.message.text + '\n')
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

      <button className='btn' onClick={handleSend} disabled={messageInput === ''} >Send</button>
    </div>
  )
}
