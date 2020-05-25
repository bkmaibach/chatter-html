export const roomPasswords = (action, state) => {
  state.roomPasswords = state.roomPasswords || {}
  if (action.type === 'SET_ROOM_PASSWORD') {
    console.log('SETTING ROOM PASSWORD: ', { action })
    const roomId = action.roomId
    const password = action.password
    const oldRoomPasswords = state.roomPasswords
    const newRoomPasswords = { ...oldRoomPasswords, [roomId]: password }
    console.log(newRoomPasswords)
    state.roomPasswords = newRoomPasswords
    return state
  }
  return state
}
