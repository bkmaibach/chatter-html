import { useEffect } from 'react'

import { Entry } from '/elements/entry'
import { useRoom } from '/apps/chatter/hooks/use-room'
import { EntryInput } from '../entry-input'
import './chatbox.less'

export const ChatBox = ({ roomId }) => {
  const [entries, sendNewEntry] = useRoom(roomId)

  const handleSend = (text) => {
    console.log('sending')
    sendNewEntry(text)
  }

  useEffect(() => {
    console.log('SCROLLING NOW')
    window.scrollTo(0, document.body.scrollHeight)
  }, [entries])

  return (
    <div className='chatbox'>
      {entries.map(Entry)}
      <EntryInput
        onSend={handleSend}
      />
    </div>
  )
}
