import { createSlice } from '@reduxjs/toolkit'

export const loginData = createSlice({
  name: 'loginData',
  initialState: {
    accessToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
})

export const { setToken } = loginData.actions

export default loginData.reducer;