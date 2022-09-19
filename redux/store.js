import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import modelReducer from './modelSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    model: modelReducer
  }
})
