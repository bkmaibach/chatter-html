import Router, { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { getState, logout } from '/store'
import { routes } from './index'

const ChatterFooter = () =>
  <header className='container'>
    <Link name='rooms'>Rooms</Link>&nbsp;
    <button onClick={ev => logout()}>Logout</button>
  </header>

export function ChatterApp () {
  const { token, currentPath } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' queries={{ next: currentPath }} />
  }
  return (
    <div id='chatter-layout'>
      <Router routes={routes} />
      <ChatterFooter />
    </div>
  )
}
