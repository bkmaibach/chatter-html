// We are going to use ListResource to fetch and display results of
// an API request. You could also use the lower-level [withRequest HoC](https://github.com/inputlogic/elements/tree/master/components/with-request)
import { useRequest } from '@app-elements/use-request'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link, routeTo } from '@app-elements/router'
import url from '/util/url'
import './rooms.less'
import store, { getState } from '/store'
import { request } from '@app-elements/use-request/request'
import React, { useState } from 'react'
// import React from 'react'

const RoomItem = ({ id, name }) => (
  <div class='room-item'>
    <h3><Link name='room' args={{ id }}>{name}</Link></h3>
  </div>
)

export const Rooms = () => {
  const [newNameInput, setNewNameInput] = useState('')
  const { token } = getState()

  const handleCreateNewRoom = () => {
    const { xhr, promise } = request({
      url: url('api.rooms'),
      method: 'post',
      headers: {
        Authorization: `token ${token}`
      },
      data: {
        name: newNameInput
      }
    })
    promise.then((res) => {
      setNewNameInput('')
      console.log('Response obtained: ', { res })
      routeTo('rooms')
    }).catch((err) => { console.warn({ err, xhr }) })
  }

  const handleInputChange = (e) => {
    setNewNameInput(e.target.value)
  }

  const { result, error, isLoading } = useRequest(store, url('api.rooms'))

  if (isLoading) {
    return <div className='container mt-2'><LoadingIndicator /></div>
  }
  if (error) {
    return <div>Error!</div>
  }
  return (
    <div className='container pt-7 pb-4'>
      {result.results.map(({ id, name }) => RoomItem({ id, name }))}
      <input id='new-room-input'
        type='text'
        size='100'
        value={newNameInput}
        onChange={handleInputChange} />
      <button className='btn' onClick={handleCreateNewRoom} disabled={newNameInput === ''} >
        Create New Room
      </button>
    </div>
  )
}
