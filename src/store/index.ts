"use client"


import { configureStore } from "@reduxjs/toolkit"
import landingReducer from "./slices/landingSlice"
import navigationReducer from "./slices/navigationSlice"

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    navigation: navigationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
