export const roomPasswords = (action, state) => {
  state.roomPasswords = state.roomPasswords || {}
  console.log('ACTION DISPATCHED')
  if (action.type === 'SET_ROOM_PASSWORD') {
    console.log('SETTING ROOM PASSWORD: ', { action })
    const roomId = action.roomId
    const password = action.password
    const oldRoomPasswords = state.roomPasswords
    const newRoomPasswords = { ...oldRoomPasswords, [roomId]: { password, isCorrect: null } }
    console.log(newRoomPasswords)
    state.roomPasswords = newRoomPasswords
    return state
  } else if (action.type === 'SET_ROOM_PASSWORD_VERIFIED') {
    console.log('SETTING ROOM PASSWORD VERIFIED: ', { action })
    const roomId = action.roomId
    const oldRoomPasswords = state.roomPasswords
    const newRoomPasswords = { ...oldRoomPasswords }
    newRoomPasswords[roomId].isCorrect = action.isCorrect
    console.log(newRoomPasswords)
    state.roomPasswords = newRoomPasswords
    return state
  }
  return state
}
