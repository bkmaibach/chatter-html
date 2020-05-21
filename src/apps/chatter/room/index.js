// Here is a page that will display details about a specific resource.
// In our case, it will be a user specified by the current routes `:id`
// segment.

// We'll include Helmet for setting title and meta tags dynamically,
// based on the result of our API request.
// And we'll use the `useRequest` hook for requesting the resource data.
import { useState } from 'react'

import Helmet from '@app-elements/helmet'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link } from '@app-elements/router'
import { useRequest } from '@app-elements/use-request'

import { RoomPassword } from '../components/room-password'
import { useRoomPassword } from '../hooks/use-room-password'
import { ChatBox } from '../components/chatbox'

// `url` is a util for getting route paths by name. It's a project
// level util because it reads the statically defined [routes.js](/routes.html)
import url from '/util/url'

// We'll need to pass our store to `useRequest`
import store from '/store'

import { WEB_URL } from '/consts'

// Here is our page component which will use the `useRequest` hook.
export function Room ({ id }) {
  const [password, setPassword] = useState('')
  // const [wasBadPassword, setWasBadPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [isCorrectPassword, isChecking] = useRoomPassword(id, password)

  const handleInputChange = (e) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmitPassword = () => {
    console.log('Setting password ', passwordInput, 'Correct? ', isCorrectPassword)
    setPassword(passwordInput)
  }

  const { result, error, isLoading } = useRequest(store, url('api.room', { args: { id } }))

  if (isLoading) {
    return <div className='container mt-2'><LoadingIndicator /></div>
  }

  if (error != null) {
    return error.code === 404
      ? <div><p>A chatroom with that name was not found!</p></div>
      : <div><p>Something went wrong!</p></div>
  }

  const { name, hasPassword } = result

  return (
    <div key='user' className='container pt-7'>
      <Helmet
        title={name}
        meta={[
          { name: 'description', content: 'Helmet description' },
          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: name },
          { property: 'og:description', content: 'Helmet description' },
          { property: 'og:image', content: 'https://www.gooseinsurance.com/images/blog-image-1.jpg' },
          { property: 'og:url', content: `${WEB_URL}${url('api.room', { args: { id } })}` }
        ]}
      />
      <p><Link name='rooms'>&larr; Back to all rooms</Link></p>
      <h1>{name}</h1>
      {(isCorrectPassword || !hasPassword)
        ? <ChatBox roomId={id} password={password} />
        : <RoomPassword
          isChecking={isChecking}
          showWrongPasswordMessage={!isCorrectPassword && password !== ''}
          passwordInput={passwordInput}
          handleInputChange={handleInputChange}
          handleSubmitPassword={handleSubmitPassword}
        />}
    </div>
  )
}
