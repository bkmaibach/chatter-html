import { useRef, useEffect, useState } from 'react'

import url from '/util/url'
import { getState } from '/store'

export function useRoom (roomId) {
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  const NEW_MESSAGE = 'NEW_MESSAGE'
  const MESSAGES = 'MESSAGES'
  const INIT_CHAT = 'INIT_CHAT'
  const FETCH_MESSAGES = 'FETCH_MESSAGES'

  useEffect(() => {
    connect()
    return () => {
      socketRef.current.close()
    }
  }, [])

  const connect = () => {
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId } })
    socketRef.current = new window.WebSocket(socketUrl)
    socketRef.current.onopen = () => {
      console.log('WebSocket open to url ', socketUrl)
      initChatUser()
      sendFetchCommand()
    }
    socketRef.current.onmessage = e => {
      onNewDataIn(e.data)
    }
    socketRef.current.onerror = e => {
      console.log(e.message)
    }
    socketRef.current.onclose = () => {
      console.log('WebSocket closed let\'s reopen')
      connect()
    }
  }

  const onNewDataIn = (data) => {
    // console.log('DATA IN: ', { data })
    const parsedData = JSON.parse(data)
    const command = parsedData.command
    if (command === NEW_MESSAGE) {
      onNewMessage(parsedData)
    } else if (command === MESSAGES) {
      onFetchMessages(parsedData)
    }
  }

  // Functions called upon input from the server
  const onNewMessage = (parsedData) => {
    setMessages((previous) => ([...previous, parsedData.message]))
  }

  const onFetchMessages = (parsedData) => {
    // console.log('RECEIVED NEW MESSAGES COMMAND: ', parsedData)
    setMessages(parsedData.messages.reverse())
  }

  // Functions for sending output to the server
  const initChatUser = () => {
    const { token } = getState()
    // console.log('INITIALIZING USER WITH TOKEN: ', token)
    sendCommand({
      command: INIT_CHAT,
      token
    })
  }

  const sendFetchCommand = () => {
    const { token } = getState()
    // console.log('SENDING FETCH COMMAND WITH TOKEN: ', token)
    sendCommand({
      command: FETCH_MESSAGES,
      token
    })
  }

  const sendNewMessage = (text) => {
    const { token } = getState()
    // console.log('SENDING NEW MESSAGE WITH TOKEN: ', token)
    sendCommand({
      command: NEW_MESSAGE,
      text,
      token
    })
  }

  const sendCommand = ({ command, text, token }) => {
    try {
      socketRef.current.send(JSON.stringify({ command, text, token }))
    } catch (err) {
      console.log(err.message)
    }
  }

  return [messages, sendNewMessage]
}
