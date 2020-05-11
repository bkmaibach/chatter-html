import url from '/util/url'

class WebSocketService {
  static instance = null

  callbacks = []

  static getInstance () {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  constructor () {
    this.socketRefs = []
    // console.log(this.socketRefs)
  }

  connect (roomId) {
    // console.log('using roomId type ' + typeof roomId)
    // console.log('Creating websocket to room ', roomId)
    const socketUrl = url('api_ws.chatSocket', { args: { id: roomId.toString() } })
    // console.log('window IS ', {window})
    // console.log('roomID IS ', {roomId})
    // console.log('socketUrl IS ', {socketUrl})
    // socketRefs = this.socketRefs
    // console.log('socketRefs IS ', this.socketRefs)
    this.socketRefs[roomId] = new window.WebSocket(socketUrl)
    this.socketRefs[roomId].onopen = () => {
      // console.log('WebSocket open to room ', roomId)
    }
    this.socketRefs[roomId].onmessage = e => {
      this.socketNewMessage(roomId, e.data)
    }

    this.socketRefs[roomId].onerror = e => {
      console.log(e.message)
    }
    this.socketRefs[roomId].onclose = () => {
      console.log('WebSocket closed let\'s reopen')
      this.connect(roomId)
    }
  }

  socketNewMessage (roomId, data) {
    // console.log('using roomId type ' + typeof roomId)
    const parsedData = JSON.parse(data)
    console.log('Parsed data sent: ', { parsedData })
    const command = parsedData.command
    console.log('Command recevied is: ', { command })
    if (Object.keys(this.callbacks[roomId]).length === 0) {
      return
    }
    if (command === 'MESSAGES') {
      console.log('MESSAGES HAVE BEEN FETCHED')
      this.callbacks[roomId][command](parsedData.messages)
    }
    if (command === 'NEW_MESSAGE') {
      // console.log('room callbacks: ', this.callbacks[roomId])
      // console.log('room command callback: ', this.callbacks[roomId][command])
      // console.log('Using parsed data:', parsedData.message)
      this.callbacks[roomId][command](parsedData.message)
    }
  }

  initChatUser (roomId, token) {
    // console.log('using roomId type ' + typeof roomId)
    this.sendMessage(roomId, { command: 'INIT_CHAT', token })
  }

  fetchMessages (roomId, token) {
    // console.log('using roomId type ' + typeof roomId)
    console.log('Fetching messages')
    this.sendMessage(roomId, { command: 'FETCH_MESSAGES', token })
  }

  newChatMessage (roomId, text, token) {
    // console.log('using roomId type ' + typeof roomId)
    this.sendMessage(roomId, { command: 'NEW_MESSAGE', text, token })
  }

  addCallbacks (roomId, messagesCallback, newMessageCallback) {
    this.callbacks[roomId] = {}
    this.callbacks[roomId]['MESSAGES'] = messagesCallback
    this.callbacks[roomId]['NEW_MESSAGE'] = newMessageCallback
  }

  sendMessage (roomId, { command, text, token }) {
    try {
      this.socketRefs[roomId].send(JSON.stringify({ command, text, token }))
    } catch (err) {
      console.log(err.message)
    }
  }

  state (roomId) {
    return this.socketRefs[roomId].readyState
  }

  // waitForSocketConnection (callback) {
  //   const socket = this.socketRefs[roomId]
  //   const recursion = this.waitForSocketConnection
  //   setTimeout(
  //     function () {
  //       if (socket.readyState === 1) {
  //         console.log('Connection is made')
  //         if(callback != null){
  //           callback()
  //         }
  //         return

  //       } else {
  //         console.log('wait for connection...')
  //         recursion(callback)
  //       }
  //     }, 1) // wait 5 milisecond for the connection...
  // }
}

export const WebSocketServiceInstance = WebSocketService.getInstance()
