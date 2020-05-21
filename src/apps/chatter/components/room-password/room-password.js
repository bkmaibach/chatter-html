import Modal from '@app-elements/modal'
import LoadingIndicator from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'

export const RoomPassword = ({
  passwordInput,
  handleInputChange,
  handleSubmitPassword,
  isChecking,
  showWrongPasswordMessage
}) => {
  return <Modal className='styled-modal small'>
    <div className='modal-header'>
      <h2>Please enter the password</h2>
    </div>

    <div className='actions centered'>
      {isChecking
        ? <LoadingIndicator />
        : <div className='room-password'>
          <TextInput
            name='password'
            placeholder='Enter password...'
            value={passwordInput}
            onChange={handleInputChange}
            onEnterUp={handleSubmitPassword}
            focus
          />
          {showWrongPasswordMessage && <h2>Sorry! wrong password</h2>}
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
