import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

const initialState = {
  userInfo: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userVotes');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;