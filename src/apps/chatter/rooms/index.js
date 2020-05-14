import { useRequest } from '@app-elements/use-request'
import { Link } from '@app-elements/router'
import Form, { SubmitButton } from '@app-elements/form'
import LoadingIndicator from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'

import store, { dispatch, clearRequest } from '/store'
import url from '/util/url'

import './rooms.less'

const RoomItem = ({ id, name }) => (
  <div class='room-item'>
    <h3><Link name='room' args={{ id }}>{name}</Link></h3>
  </div>
)

export const Rooms = () => {
  const { result, error, isLoading } = useRequest(store, url('api.rooms'))

  if (isLoading) {
    return <div className='container mt-2'><LoadingIndicator /></div>
  }

  if (error) {
    return <div>Error!</div>
  }

  const formProps = {
    name: 'CreateRoom',
    action: url('api.rooms'),
    method: 'post',
    onSuccess: (res) => {
      console.log('onSuccess', { res })
      // useRequest caches results, so we dispatch the clearRequest
      // action to clear the cache, which will trigger the above `useRequest`
      // call to re-fetch data from the server.
      dispatch(clearRequest(url('api.rooms')))
    },
    onFailure: (err) => {
      console.error('onFailure', { err })
    }
  }

  return (
    <div className='container pt-7 pb-4'>
      {result.results.map(RoomItem)}

      <Form {...formProps}>
        <TextInput name='name' placeholder='Room Name' required isFormField />
        <SubmitButton className='btn'>Create New Room</SubmitButton>
      </Form>
    </div>
  )
}
