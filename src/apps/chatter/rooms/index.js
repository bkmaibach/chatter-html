// We are going to use ListResource to fetch and display results of
// an API request. You could also use the lower-level [withRequest HoC](https://github.com/inputlogic/elements/tree/master/components/with-request)
// import Form from '@app-elements/form'
import useRequest from '@app-elements/useRequest'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link } from '@app-elements/router'
import url from '/util/url'
import './rooms.less'
import store from '/store'
import React from 'react'

const RoomItem = ({ id, name }) =>
  <div class='room-item'>
    <h3><Link name='room' args={{ id }}>{name}</Link></h3>
  </div>

export const Rooms = () => {
  // const [textInput, setTextInput] = useState('')
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
    </div>
  )
}
