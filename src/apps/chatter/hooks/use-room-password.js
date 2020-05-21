import { useRef, useEffect, useState } from 'react'

import url from '/util/url'
import { getState } from '/store'

export function useRoomPassword (roomId, password) {
  console.log('USING ROOM PASSWORD!', roomId, password)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const socketRef = useRef()

  const INIT_CHAT = 'INIT_CHAT'
  const INIT_RESPONSE = 'INIT_RESPONSE'

  useEffect(() => {
    console.log('USING EFFECT SUBJECT TO PASSWORD: ', password)
    initialize()
    return () => {
      socketRef.current.close()
    }
  }, [password])

  const initialize = () => {
    console.log('INITIALIZING, HAVE PASSWORD: ', password)
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId } })
    socketRef.current = new window.WebSocket(socketUrl)
    socketRef.current.onopen = () => {
      console.log('WebSocket open to url ', socketUrl)
      checkPassword()
    }
    socketRef.current.onmessage = e => {
      // console.log('DATA IN: ', { data })
      const parsedMessage = JSON.parse(e.data)
      const command = parsedMessage.command
      if (command === INIT_RESPONSE) {
        console.log('RECEIVED INIT RESPONSE COMMAND: ', parsedMessage)
        setIsChecking(false)
        setIsCorrectPassword(parsedMessage.authorized)
      }
    }
    socketRef.current.onerror = e => {
      console.log(e.entry)
    }
    socketRef.current.onclose = () => {
      console.log('WebSocket closed')
      // connect()
    }
  }

  // Functions for sending output to the server
  const checkPassword = () => {
    const { token } = getState()
    console.log('INITIALIZING CHAT WITH PASSWORD: ', password)
    setIsChecking(true)
    sendMessage({
      command: INIT_CHAT,
      password,
      token
    })
  }

  const sendMessage = (message) => {
    console.log('SENDING MESSAGE ', message)
    try {
      socketRef.current.send(JSON.stringify(message))
    } catch (err) {
      console.log(err.message)
    }
  }

  return [isCorrectPassword, isChecking]
}
