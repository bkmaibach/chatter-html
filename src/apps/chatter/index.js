import asyncComponent from '/elements/async-component'
import url from '/util/url'

import Rooms from './rooms'

console.log(url('rooms'), Rooms)

export const routes = {
  rooms: {
    path: url('rooms'),
    component: Rooms
  },
  room: {
    path: url('room'),
    component: asyncComponent(() => import('./room').then(m => m.default))
  }
}

const LazyChatter = asyncComponent(() =>
  import('./chatter.js').then(m => m.default)
)

export default LazyChatter
