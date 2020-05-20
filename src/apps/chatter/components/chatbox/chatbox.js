import { useEffect, useState } from 'react'
import LoadingIndicator from '@app-elements/loading-indicator'

import { Entry } from '/elements/entry'
import { TextInput } from '/elements/text-input'
import { useRoom } from '/apps/chatter/hooks/use-room'
import { EntryInput } from '../entry-input'
import './chatbox.less'

export const ChatBox = ({ roomId }) => {
  const [password, setPassword] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [entries, sendNewEntry, isAuthorized, isInitialized] = useRoom(roomId, password)

  const handleInputChange = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmitPassword = () => {
    console.log('Setting password ', passwordInput, 'Authorized? ', isAuthorized)
    setPassword(passwordInput)
  }
  const handleSend = (text) => {
    console.log('sending')
    sendNewEntry(text)
  }

  useEffect(() => {
    console.log('SCROLLING NOW')
    window.scrollTo(0, document.body.scrollHeight)
  }, [entries])

  const enterPasswordJsx = <div className='chatbox'>
    <TextInput
      name='password'
      placeholder='Enter password...'
      value={passwordInput}
      onChange={handleInputChange}
    />
    <button
      className='btn'
      onClick={handleSubmitPassword}
      disabled={passwordInput === ''}
    >Submit</button>
  </div>

  const chatJsx = <div className='chatbox'>
    {entries.map(Entry)}
    <EntryInput
      onSend={handleSend}
    />
  </div>

  const loadingJsx = <div className='chatbox'>
    <LoadingIndicator />
  </div>

  if (isInitialized) {
    if (isAuthorized) {
      return chatJsx
    } else {
      return enterPasswordJsx
    }
  } else {
    return loadingJsx
  }
}
