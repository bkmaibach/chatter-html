import asyncComponent from '/elements/async-component'
import url from '/util/url'

import { Rooms } from './rooms'

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

export const Chatter = asyncComponent(() =>
  import('./chatter.js').then(m => m.default)
)
