import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, logout } from './authSlice';
import { loginUser, registerUser } from '@/services/authServices';
import { User } from '@/types/auth';
import { RootState } from '@/app/store';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            const data = await loginUser(credentials);

            const sanitizedUser: User = {
                id: String(data.user.id),
                username: data.user.username,
                email: data.user.email,
            };

            dispatch(loginSuccess({ user: sanitizedUser, accessToken: data.access_token }));
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (
        userData: { username: string; email: string; password: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const registeredUser = await registerUser(userData);

            const loginData = await loginUser({
                username: registeredUser.username,
                password: registeredUser.password,
            });

            const sanitizedUser: User = {
                id: String(loginData.user.id),
                username: loginData.user.username,
                email: loginData.user.email,
            };

            dispatch(loginSuccess({ user: sanitizedUser, accessToken: loginData.access_token }));
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'registration failed' );
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    dispatch(logout());
});
