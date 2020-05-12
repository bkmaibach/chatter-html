import url from '/util/url'
import {
  useRef
} from 'react'

export function useWebSockets (roomId) {
  const socketUrl = url('api_ws.chatSocket', {
    args: {
      id: roomId.toString()
    }
  })
  const callbacks = useRef({})
  const socketRef = useRef()

  const connect = () => {
    socketRef.current = new window.WebSocket(socketUrl)
    socketRef.current.onopen = () => {
      console.log('WebSocket open to url ', socketUrl)
    }
    socketRef.current.onmessage = e => {
      socketNewMessage(e.data)
    }
    socketRef.current.onerror = e => {
      console.log(e.message)
    }
    socketRef.current.onclose = () => {
      console.log('WebSocket closed let\'s reopen')
      connect()
    }
  }

  const socketNewMessage = (data) => {
    const parsedData = JSON.parse(data)
    const command = parsedData.command
    if (Object.keys(callbacks.current).length === 0) {
      return
    }
    callbacks.current[command](parsedData.messages)
  }

  const initChatUser = (token) => {
    sendMessage({
      command: 'INIT_CHAT',
      token
    })
  }

  const fetchMessages = (token) => {
    sendMessage({
      command: 'FETCH_MESSAGES',
      token
    })
  }

  const newChatMessage = (text, token) => {
    sendMessage({
      command: 'NEW_MESSAGE',
      text,
      token
    })
  }

  const onFetchMessages = (messagesCallback) => {
    callbacks.current['MESSAGES'] = messagesCallback
  }

  const onNewMessage = (newMessageCallback) => {
    callbacks.current['NEW_MESSAGE'] = newMessageCallback
  }

  const sendMessage = ({
    command,
    text,
    token
  }) => {
    try {
      socketRef.current.send(JSON.stringify({
        command,
        text,
        token
      }))
    } catch (err) {
      console.log(err.message)
    }
  }

  const state = () => {
    return socketRef.current.readyState
  }

  return [connect, initChatUser, fetchMessages, newChatMessage, onFetchMessages, onNewMessage, state]
}
