import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('ag_token') : null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API}/api/auth/login`, data);
  return res.data;
});

export const registerUser = createAsyncThunk('auth/register', async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(`${API}/api/auth/register`, data);
  return res.data;
});

export const demoLogin = createAsyncThunk('auth/demo', async () => {
  const res = await axios.post(`${API}/api/auth/demo`);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') localStorage.removeItem('ag_token');
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => { state.loading = true; state.error = null; };
    const handleFulfilled = (state: AuthState, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') localStorage.setItem('ag_token', action.payload.token);
    };
    const handleRejected = (state: AuthState, action: any) => {
      state.loading = false;
      state.error = action.error.message || 'Authentication failed';
    };
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(demoLogin.pending, handlePending)
      .addCase(demoLogin.fulfilled, handleFulfilled)
      .addCase(demoLogin.rejected, handleRejected);
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
