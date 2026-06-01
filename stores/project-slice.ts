import { createSlice } from "@reduxjs/toolkit"

const projectSlice = createSlice({
  name: "project-slice",
  initialState: {
    modal: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.modal = !state.modal
    },
  },
})

export const { toggleModal } = projectSlice.actions

export default projectSlice.reducer
