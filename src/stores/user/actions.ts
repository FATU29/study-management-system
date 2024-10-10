import { createAsyncThunk } from "@reduxjs/toolkit";




export const serviceName = "user"


// export const getAllUsersAction = createAsyncThunk(
//   `${serviceName}/getAllUsersAction`,
//   async (data : {params:TParamsGetUsers}, { rejectWithValue }) => {
//     try {
//       const response = await getAllUsers(data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(
//         {
//           ...error
//         }
//       )
//     }
//   }
// );




