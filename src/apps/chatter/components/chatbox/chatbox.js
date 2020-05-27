import { useEffect } from 'react'

import { useMappedState } from '@app-elements/use-mapped-state'

import { Entry } from '/elements/entry'
import { EntryInput } from '../entry-input'
import { useRoom } from '/apps/chatter/hooks/use-room'
import './chatbox.less'
import store from '/store'
import LoadingIndicator from '@app-elements/loading-indicator'

export const ChatBox = (id) => {
  const passwordObject = useMappedState(store, ({ roomPasswords }) => roomPasswords[id] || {})
  const password = passwordObject.password
  const {
    isLoading,
    entries,
    sendNewEntry
  } = useRoom(id, password)

  const handleSend = (text) => {
    console.log('sending')
    sendNewEntry(text)
  }

  useEffect(() => {
    console.log('SCROLLING NOW')
    window.scrollTo(0, document.body.scrollHeight)
  }, [entries])

  return <div className='chatbox'>
    {isLoading && <LoadingIndicator />}
    {entries.map(Entry)}
    <EntryInput onSend={handleSend} />
  </div>
}
