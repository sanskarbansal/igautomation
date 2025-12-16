import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import { setAuthToken } from '../../utils/axios';

// NOTE: adjust API endpoints as needed for your backend

const initialToken = localStorage.getItem('auth_token') || null;
const initialUser = (() => {
  try {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

const initialState = {
  user: initialUser,
  token: initialToken,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunks
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await authApi.login(credentials);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const register = createAsyncThunk('auth/register', async (payloadData, thunkAPI) => {
  try {
    const data = await authApi.register(payloadData);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth?.token || localStorage.getItem('auth_token');
    if (!token) return thunkAPI.rejectWithValue({ message: 'No token available' });
    const data = await authApi.me(token);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const data = await authApi.refresh();
    return data; // expect { token }
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      try {
        setAuthToken(null);
      } catch (e) {}
      try {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      } catch (e) {}
    },
    setUser(state, action) {
      state.user = action.payload;
      try {
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      } catch (e) {}
    },
    setToken(state, action) {
      state.token = action.payload;
      try {
        if (action.payload) {
          setAuthToken(action.payload);
          localStorage.setItem('auth_token', action.payload);
        } else {
          setAuthToken(null);
          localStorage.removeItem('auth_token');
        }
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // backend should return { user, token }
        const { user, token } = action.payload;
        state.user = user || null;
        state.token = token || null;
        try {
          if (token) {
            setAuthToken(token);
            localStorage.setItem('auth_token', token);
          }
          if (user) localStorage.setItem('auth_user', JSON.stringify(user));
        } catch (e) {}
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
      })

      // register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // optionally log the user in after register if backend returns user+token
        const { user, token } = action.payload || {};
        state.user = user || state.user;
        state.token = token || state.token;
        try {
          if (token) {
            setAuthToken(token);
            localStorage.setItem('auth_token', token);
          }
          if (user) localStorage.setItem('auth_user', JSON.stringify(user));
        } catch (e) {}
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
      })

      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload || null;
        try {
          if (action.payload) localStorage.setItem('auth_user', JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
      })

      // refreshToken
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { token } = action.payload || {};
        state.token = token || state.token;
        try {
          if (token) {
            setAuthToken(token);
            localStorage.setItem('auth_token', token);
          }
        } catch (e) {}
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error;
      });
  },
});

export const { logout, setUser, setToken } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
