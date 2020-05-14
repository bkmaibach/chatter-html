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
  const [newNameInput, setNewNameInput] = useState('')
  // I am nearly certain there is a smarter way to accomplish this...
  const [newRoomToRender, setNewRoomToRender] = useState(true)
  const [roomsAreLoading, setRoomsAreLoading] = useState(false)
  const [roomList, setRoomList] = useState([])
  const { token } = getState()

  useEffect(() => {
    console.log('USING EFFECT')
    if (newRoomToRender) {
      console.log('REQUESTING ROOMS')
      const { result, error, isLoading } = useRequest(store, url('api.rooms'))
      setRoomsAreLoading(isLoading)
      if (error) {
        console.log(error)
      }
      console.log('REQUESTING ROOMS')
      setRoomList(result.results)
      // I am nearly certain there is a smarter way to accomplish this...
      setNewRoomToRender(false)
    }
  }, [newRoomToRender])

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
      setNewRoomToRender(true)
      setNewNameInput('')
      console.log('Response obtained: ', { res })
    }).catch((err) => { console.warn({ err, xhr }) })
  }

  const handleInputChange = (e) => {
    setNewNameInput(e.target.value)
  }

  return (
    <div className='container pt-7 pb-4'>
      {roomsAreLoading && <div className='container mt-2'><LoadingIndicator /></div>}
      {roomList.map(({ id, name }) => RoomItem({ id, name }))}
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
