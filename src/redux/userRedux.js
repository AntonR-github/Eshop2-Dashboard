import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
        state.isFetching = true;
    },
    loginSuccess: (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
    },
    loginFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
    logout: (state) => {
        state.currentUser = null;
        state.isFetching = false;
        state.error = false;
    },
    // GET ALL USERS
    getUsersStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    getUsersSuccess: (state, action) => {
        state.isFetching = false;
        state.users = action.payload;
    },
    getUsersFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
    // DELETE USER
    deleteUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    deleteUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.splice(
            state.users.findIndex((item) => item._id === action.payload),1
        );
    },
    deleteUserFailure: (state) => { 
        state.isFetching = false;
        state.error = true;
    },
    // UPDATE USER
    updateUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    updateUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users[
            state.users.findIndex((item) => item._id === action.payload._id)
        ] = action.payload.user;
    },
    updateUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
    // ADD USER
    addUserStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    addUserSuccess: (state, action) => {
        state.isFetching = false;
        state.users.push(action.payload);
    },
    addUserFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  logout,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;
export default userSlice.reducer;