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

  return (
    <div className='chatbox'>
      {messages.map(Message)}
      <MessageInput
        onSend={handleSend}
      />
    </div>
  )
}
