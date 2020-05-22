import { useRef, useEffect, useState } from 'react'

import url from '/util/url'
import { getState } from '/store'

export function useRoom (roomId, password) {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)
  const [passwordVerified, setIsVerified] = useState(false)
  const socketRef = useRef()

  // API commands
  const NEW_ENTRY = 'NEW_ENTRY'
  const FETCH_ENTRIES = 'FETCH_ENTRIES'
  const ENTRIES = 'ENTRIES'
  const INIT_CHAT = 'INIT_CHAT'
  const INIT_RESPONSE = 'INIT_RESPONSE'

  useEffect(() => {
    console.log('CONNECTING')
    setIsLoading(true)
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId } })
    socketRef.current = new window.WebSocket(socketUrl)
    socketRef.current.onmessage(e => {
      onNewMessage(e.data)
    })
    socketRef.current.onerror = e => {
      setIsError(true)
      console.log(e.entry)
    }
    socketRef.current.onopen = () => {
      setIsLoading(false)
    }
    return () => {
      socketRef.current.close()
    }
  }, [])

  useEffect(() => {
    console.log('USING EFFECT SUBJECT TO PASSWORD: ', password)
    if (this.socketRef.readyState) {
      checkPassword()
    } else {
      socketRef.current.onopen = () => {
        setIsLoading(false)
        checkPassword()
      }
    }
  }, [password])

  const onNewMessage = (messageString) => {
    // console.log('DATA IN: ', { data })
    const parsedMessage = JSON.parse(messageString)
    const command = parsedMessage.command
    if (command === NEW_ENTRY) {
      onNewEntry(parsedMessage)
    } else if (command === ENTRIES) {
      onFetchEntries(parsedMessage)
    } else if (command === INIT_RESPONSE) {
      onPasswordVerified(parsedMessage)
    }
  }

  // Functions for sending output to the server
  const checkPassword = () => {
    const { token } = getState()
    console.log('INITIALIZING CHAT WITH PASSWORD: ', password)
    sendMessage({
      command: INIT_CHAT,
      password,
      token
    })
  }

  // Functions called upon input from the server
  const onNewEntry = (parsedMessage) => {
    setEntries((previous) => ([...previous, parsedMessage.entry]))
  }

  const onFetchEntries = (parsedMessage) => {
    console.log('RECEIVED NEW MESSAGES COMMAND: ', parsedMessage)
    setIsReady(true)
    setEntries(parsedMessage.entries.reverse())
  }

  const onPasswordVerified = (parsedMessage) => {
    setIsVerified(parsedMessage.authorized)
    if (passwordVerified) {
      sendFetchCommand()
    }
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
      setIsError(true)
    }
  }

  return { isLoading, isReady, isError, passwordVerified, entries, sendNewEntry }
}
