import { configureStore } from "@reduxjs/toolkit"
import projectSlice from "./project-slice"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    project: projectSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
