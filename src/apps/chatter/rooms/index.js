// We are going to use ListResource to fetch and display results of
// an API request. You could also use the lower-level [withRequest HoC](https://github.com/inputlogic/elements/tree/master/components/with-request)
import { useRequest } from '@app-elements/use-request'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link } from '@app-elements/router'
import url from '/util/url'
import './rooms.less'
import store from '/store'

const RoomItem = ({ id, name }) =>
  <div class='room-item'>
    <h3><Link name='room' args={{ id }}>{name}</Link></h3>
  </div>

const Rooms = () => {
  console.log("In rooms?")
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

export default Rooms
