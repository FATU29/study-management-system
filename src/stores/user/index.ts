// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { serviceName } from './actions'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  users: {
    data: [],
    total: 0
  }
}


export const userSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {

  },

//   extraReducers: builder => {
//     // getAllusers
//     builder.addCase(getAllUsersAction.pending, (state, action) => {
   
//     })

//     builder.addCase(getAllUsersAction.fulfilled, (state, action: any) => {
   

//     })

//     builder.addCase(getAllUsersAction.rejected, (state, action: any) => {
     
//     })
//   },
})


// Action creators are generated for each case reducer function
export const {  } = userSlice.actions
export default userSlice.reducer
