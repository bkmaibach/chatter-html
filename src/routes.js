import { API_URL, API_WS_URL } from '/consts'

export default [
  {
    namespace: '',
    url: '',
    routes: {
      home: '/',
      login: '/login',
      signup: '/signup',
      forgotPassword: '/forgot-password',
      resetPassword: '/reset-password/:resetToken/:userId',
      users: '/users',
      user: '/users/:id',
      rooms: '/rooms',
      room: '/rooms/:id'
    }
  },
  {
    // For use with django-api-starter
    // http://github.com/inputlogic/django-api-starter
    namespace: 'api',
    url: API_URL,
    routes: {
      login: '/auth/login',
      signup: '/auth/signup',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      users: '/users',
      user: '/users/:id',
      rooms: '/chat/rooms/',
      room: '/chat/rooms/:id/'
    }
  },
  {
    namespace: 'api_ws',
    url: API_WS_URL,
    routes: {
      chatSocket: '/ws/chat/:id/'
    }
  }

]
