"use client"


import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { User } from "../types"

interface UserState {
  user: User | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  user: {
    id: "1",
    name: "Əli Məmmədov",
    email: "ali@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    completedCourses: 12,
    totalCourses: 25,
  },
  isAuthenticated: true,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
