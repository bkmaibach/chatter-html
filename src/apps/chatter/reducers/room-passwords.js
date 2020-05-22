export const roomPasswords = (action, state) => {
  if (action.type === 'SET_ROOM_PASSWORD') {
    if (state.roomPasswords == null) {
      state.roomPasswords = {}
    }
    console.log('SETTING ROOM PASSWORD: ', { action })
    const roomId = action.roomId
    const password = action.password
    state.roomPasswords[roomId] = password
    return state
  }
}
