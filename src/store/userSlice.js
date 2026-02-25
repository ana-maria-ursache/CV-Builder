import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUser: null, 
  isAdmin: false,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (state, action) => {
      state.isLoggedIn = !!action.payload;
      state.currentUser = action.payload;
      state.loading = false;
    },

    setRole: (state, action) => {
      state.isAdmin = action.payload === 'admin';
    },

    clearUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.isAdmin = false;
      state.loading = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setUser, setRole, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;