import { useRef, useEffect, useState } from 'react'

import url from '/util/url'
import { getState } from '/store'

export function useRoom (roomId) {
  const [messages, setEntries] = useState([])
  const socketRef = useRef()

  const NEW_ENTRY = 'NEW_ENTRY'
  const INIT_CHAT = 'INIT_CHAT'
  const FETCH_ENTRIES = 'FETCH_ENTRIES'
  const ENTRIES = 'ENTRIES'

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
      onNewMessage(e.data)
    }
    socketRef.current.onerror = e => {
      console.log(e.entry)
    }
    socketRef.current.onclose = () => {
      console.log('WebSocket closed let\'s reopen')
      connect()
    }
  }

  const onNewMessage = (data) => {
    // console.log('DATA IN: ', { data })
    const parsedData = JSON.parse(data)
    const command = parsedData.command
    if (command === NEW_ENTRY) {
      onNewEntry(parsedData)
    } else if (command === ENTRIES) {
      onFetchEntries(parsedData)
    }
  }

  // Functions called upon input from the server
  const onNewEntry = (parsedData) => {
    setEntries((previous) => ([...previous, parsedData.entry]))
  }

  const onFetchEntries = (parsedData) => {
    // console.log('RECEIVED NEW MESSAGES COMMAND: ', parsedData)
    setEntries(parsedData.entries.reverse())
  }

  // Functions for sending output to the server
  const initChatUser = () => {
    const { token } = getState()
    // console.log('INITIALIZING USER WITH TOKEN: ', token)
    sendMessage({
      command: INIT_CHAT,
      token
    })
  }

  const sendFetchCommand = () => {
    const { token } = getState()
    // console.log('SENDING FETCH COMMAND WITH TOKEN: ', token)
    sendMessage({
      command: FETCH_ENTRIES,
      token
    })
  }

  const sendNewMessage = (text) => {
    const { token } = getState()
    // console.log('SENDING NEW MESSAGE WITH TOKEN: ', token)
    sendMessage({
      command: NEW_ENTRY,
      text,
      token
    })
  }

  const sendMessage = ({ command, text, token }) => {
    try {
      socketRef.current.send(JSON.stringify({ command, text, token }))
    } catch (err) {
      console.log(err.entry)
    }
  }

  return [messages, sendNewMessage]
}
