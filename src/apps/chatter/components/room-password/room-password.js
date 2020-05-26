import { useState } from 'react'

import { useMappedState } from '@app-elements/use-mapped-state'
import Modal from '@app-elements/modal'
import LoadingIndicator from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'
import store, { dispatch } from '/store'

export function RoomPassword ({ roomId }) {
  const [passwordInput, setPasswordInput] = useState(null)
  const passwordObject = useMappedState(store,
    ({ roomPasswords }) => roomPasswords[roomId] || {})
  const password = passwordObject.password
  const isVerified = passwordObject.isVerified

  const handleInputChange = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmitPassword = () => {
    // console.log('DISPATCHING SET_ROOM_PASSWORD')
    dispatch({ type: 'SET_ROOM_PASSWORD', roomId, password: passwordInput })
  }
  console.log('STATE IN MODAL HAS', { passwordObject })
  return <Modal className='styled-modal small'>
    <div className='modal-header'>
      <h2>Please enter the password</h2>
    </div>

    <div className='actions centered'>
      <div className='room-password'>
        <TextInput
          name='password'
          placeholder='Enter password...'
          value={passwordInput}
          onChange={handleInputChange}
          onEnterUp={handleSubmitPassword}
          focus
        />
        {password && isVerified === false && <h2>Sorry! wrong password</h2>}
        {password && isVerified === null && <LoadingIndicator />}
        <button
          className='btn'
          onClick={handleSubmitPassword}
          disabled={passwordInput === ''}
        >Submit</button>
      </div>
    </div>
  </Modal>
}
