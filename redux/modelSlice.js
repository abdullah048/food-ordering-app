import { createSlice } from '@reduxjs/toolkit'

const modelSlice = createSlice({
  name: 'model',
  initialState: {
    data: {}
  },
  reducers: {
    addData: (state, action) => {
      state.data = action.payload
    },
    remove: (state, action) => {
      state.data = {}
    }
  }
})

export const { addData, remove } = modelSlice.actions
export default modelSlice.reducer
