import Router, { RouteTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { getState } from '/store'
import { routes } from './index'

const ChatterFooter = () =>
  <footer className='container' style={'height: 24px'} />

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
