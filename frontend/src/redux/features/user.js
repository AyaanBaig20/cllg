import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading:true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setloading: (state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser,setloading } = userSlice.actions

export default userSlice.reducer