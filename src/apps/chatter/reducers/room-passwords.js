export const roomPasswords = (action, state) => {
  switch (action.type) {
    case 'SET_ROOM_PASSWORD':
      if (typeof state.roomPasswords === 'undefined') {
        state.roomPasswords = {}
      }
      console.log('SETTING ROOM PASSWORD: ', { action })
      const roomId = action.roomId
      const password = action.password
      state.roomPasswords[roomId] = password
      return state
    default:
      return state
  }
}
