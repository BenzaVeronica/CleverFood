import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

export type UserRole = 'admin' | 'user';

export type AuthState = {
    wasLoggedIn: boolean | null;
    role: UserRole | null;
    email: string;
};
const initialState: AuthState = {
    wasLoggedIn: null,
    role: null,
    email: '',
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setWasLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.wasLoggedIn = action.payload;
        },
    },
});

export const { setEmail, setWasLoggedIn } = authSlice.actions;
export default authSlice.reducer;
