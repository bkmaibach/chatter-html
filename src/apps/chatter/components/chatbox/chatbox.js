import { useEffect } from 'react'

import { Message } from '/elements/message'
import { useRoom } from '/apps/chatter/hooks/use-room'
import { MessageInput } from '../message-input'
import './chatbox.less'

export const ChatBox = ({ roomId }) => {
  const [messages, sendNewMessage] = useRoom(roomId)

  const handleSend = (text) => {
    console.log('sending')
    sendNewMessage(text)
  }

  useEffect(() => {
    if (messages.length > 0) {
      // Why doesn't this work?
      // The console log outputs the proper value
      // But it looks like it only flashes down for a split second
      // What is causing it to scroll back up?
      // This code runs once on page load and once on new message
      console.log('SCROLLING TO ', document.body.scrollHeight)
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [messages])

  return (
    <div className='chatbox'>
      {messages.map(Message)}
      <MessageInput
        onSend={handleSend}
      />
    </div>
  )
}
