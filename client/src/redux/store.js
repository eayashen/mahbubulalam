import { configureStore } from '@reduxjs/toolkit'
import { loginData } from './loginData'
import { isLoggedIn } from './isLoggedIn'

export default configureStore({
  reducer: {
    loginData: loginData.reducer,
    isLoggedIn: isLoggedIn.reducer,
  },
})