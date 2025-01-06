import { createSlice } from '@reduxjs/toolkit'

export const isLoggedIn = createSlice({
  name: 'isLoggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = isLoggedIn.actions

export default isLoggedIn.reducer;