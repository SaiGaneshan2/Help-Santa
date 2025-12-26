import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';

// Async Thunks

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            level: 1,
            xp: 0
          }
        }
      });
      if (error) throw error;
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Set User (used by auth state listener)
export const setUser = createAsyncThunk(
  'auth/setUser',
  async (user) => {
    return user;
  }
);

// Check New User (Legacy support - no-op or simple check)
// We keep this export to avoid breaking imports in Login.jsx if I missed any
export const checkNewUser = createAsyncThunk(
  'auth/checkNewUser',
  async (username) => {
    return false; // Always return false as we can't check without auth
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isNewUser: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Legacy reducers to prevent crashes if called
    setLoading: (state, action) => { state.isLoading = action.payload; },
    resetNewUserFlag: (state) => { state.isNewUser = false; },
    updateUserProfile: (state) => { /* No-op for now */ },
    updateGameProgress: (state) => { /* No-op for now */ }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      if (action.payload && action.payload.role === 'authenticated') {
        state.isAuthenticated = true;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    // Set User
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    });
  }
});

export const { 
  clearError, 
  setError, 
  setLoading, 
  resetNewUserFlag, 
  updateUserProfile, 
  updateGameProgress 
} = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;
export const selectIsNewUser = (state) => state.auth.isNewUser;

export default authSlice.reducer;
