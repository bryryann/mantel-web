import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, logout, updateUser } from './authSlice';
import { loginUser, registerUser } from '@/services/authServices';
import { AuthState, User } from '@/types/auth';
import { updateProfileRequest } from '@/services/userServices';

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
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Login failed'
            );
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
                password: userData.password,
            });

            const sanitizedUser: User = {
                id: String(loginData.user.id),
                username: loginData.user.username,
                email: loginData.user.email,
            };

            dispatch(loginSuccess({ user: sanitizedUser, accessToken: loginData.access_token }));
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Registration failed'
            );
        }
    }
);

export const updateProfile = createAsyncThunk<
    void,
    { username?: string; password?: string },
    { state: { auth: AuthState }; rejectValue: string }
>(
    'auth/updateProfile',
    async (payload, { dispatch, getState, rejectWithValue }) => {
        try {
            const token = getState().auth.accessToken;

            if (!token) return rejectWithValue('Not authenticated');

            await updateProfileRequest(payload, token)

            if (payload.username) {
                dispatch(updateUser({ username: payload.username }));
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Failed to update profile'
            );
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
    dispatch(logout());
});
