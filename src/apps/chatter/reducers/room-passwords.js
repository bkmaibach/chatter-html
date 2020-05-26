export const roomPasswords = (action, state) => {
  state.roomPasswords = state.roomPasswords || {}
  console.log('ACTION DISPATCHED', { action })
  if (action.type === 'SET_ROOM_PASSWORD') {
    // console.log('SETTING ROOM PASSWORD: ', { action })
    const roomId = action.roomId
    const password = action.password
    const oldRoomPasswords = state.roomPasswords
    const newRoomPasswords = { ...oldRoomPasswords, [roomId]: { password, isCorrect: null } }
    state.roomPasswords = newRoomPasswords
    console.log('NEW STATE', state.roomPasswords[roomId])
    return state
  } else if (action.type === 'SET_ROOM_PASSWORD_VERIFIED') {
    // console.log('SETTING ROOM PASSWORD VERIFIED: ', { action })
    const roomId = action.roomId
    const oldRoomPasswords = state.roomPasswords
    const oldRoomPasswordObject = oldRoomPasswords[roomId] || {}
    const newRoomPasswords = { ...oldRoomPasswords,
      [roomId]: { ...oldRoomPasswordObject, isCorrect: action.isCorrect } }
    state.roomPasswords = newRoomPasswords
    console.log('NEW STATE', state.roomPasswords[roomId])
    return state
  }
  return state
}
