import { useRef, useEffect, useState } from 'react'

import url from '/util/url'
import { getState } from '/store'

export function useRoom (roomId, password) {
  const [entries, setEntries] = useState([])
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const socketRef = useRef()

  const NEW_ENTRY = 'NEW_ENTRY'
  const INIT_CHAT = 'INIT_CHAT'
  const FETCH_ENTRIES = 'FETCH_ENTRIES'
  const ENTRIES = 'ENTRIES'
  const INIT_RESPONSE = 'INIT_RESPONSE'

  useEffect(() => {
    console.log('USING EFFECT SUBJECT TO PASSWORD: ', password)
    connect()
    return () => {
      socketRef.current.close()
    }
  }, [password])

  const connect = () => {
    console.log('CONNECTING, HAVE PASSWORD: ', password)
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId } })
    socketRef.current = new window.WebSocket(socketUrl)
    socketRef.current.onopen = () => {
      console.log('WebSocket open to url ', socketUrl)
      initChatUser()
      sendFetchCommand()
    }
    socketRef.current.onmessage = e => {
      onNewMessage(e.data)
    }
    socketRef.current.onerror = e => {
      console.log(e.entry)
    }
    socketRef.current.onclose = () => {
      console.log('WebSocket closed')
      // connect()
    }
  }

  const onNewMessage = (messageString) => {
    // console.log('DATA IN: ', { data })
    const parsedMessage = JSON.parse(messageString)
    const command = parsedMessage.command
    if (command === NEW_ENTRY) {
      onNewEntry(parsedMessage)
    } else if (command === ENTRIES) {
      onFetchEntries(parsedMessage)
    } else if (command === INIT_RESPONSE) {
      onInitRespose(parsedMessage)
    }
  }

  // Functions called upon input from the server
  const onNewEntry = (parsedMessage) => {
    setEntries((previous) => ([...previous, parsedMessage.entry]))
  }

  const onFetchEntries = (parsedMessage) => {
    // console.log('RECEIVED NEW MESSAGES COMMAND: ', parsedMessage)
    setEntries(parsedMessage.entries.reverse())
  }

  const onInitRespose = (parsedMessage) => {
    console.log('RECEIVED INIT RESPONSE COMMAND: ', parsedMessage)
    setIsAuthorized(parsedMessage.authorized)
    setIsInitialized(true)
  }

  // Functions for sending output to the server
  const initChatUser = () => {
    const { token } = getState()
    console.log('INITIALIZING CHAT WITH PASSWORD: ', password)
    sendMessage({
      command: INIT_CHAT,
      password,
      token
    })
  }

  const sendFetchCommand = () => {
    const { token } = getState()
    // console.log('SENDING FETCH COMMAND WITH TOKEN: ', token)
    sendMessage({
      command: FETCH_ENTRIES,
      password,
      token
    })
  }

  const sendNewEntry = (text) => {
    const { token } = getState()
    // console.log('SENDING NEW MESSAGE WITH TOKEN: ', token)
    sendMessage({
      command: NEW_ENTRY,
      password,
      text,
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

  return [entries, sendNewEntry, isAuthorized, isInitialized]
}
