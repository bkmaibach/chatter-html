import { useState } from 'react'

import Modal from '@app-elements/modal'

import { TextInput } from '/elements/text-input'
import store, { dispatch } from '/store'
import { useMappedState } from '@app-elements/use-mapped-state'

export function RoomPassword ({ roomId }) {
  console.log('in room password')
  const [passwordInput, setPasswordInput] = useState(null)
  const passwordObject = useMappedState(store, ({ roomPasswords }) => roomPasswords[roomId] || {})
  const isCorrect = passwordObject.isCorrect

  const handleInputChange = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmitPassword = () => {
    console.log('DISPATCHING SET_ROOM_PASSWORD')
    dispatch({ type: 'SET_ROOM_PASSWORD', roomId, password: passwordInput })
  }

  return <Modal className='styled-modal small'>
    <div className='modal-header'>
      <h2>Please enter the password</h2>
    </div>

    <div className='actions centered'>
      { <div className='room-password'>
        <TextInput
          name='password'
          placeholder='Enter password...'
          value={passwordInput}
          onChange={handleInputChange}
          onEnterUp={handleSubmitPassword}
          focus
        />
        {isCorrect === false && <h2>Sorry! wrong password</h2>}
        <button
          className='btn'
          onClick={handleSubmitPassword}
          disabled={passwordInput === ''}
        >Submit</button>
      </div>
      }
    </div>
  </Modal>
}
