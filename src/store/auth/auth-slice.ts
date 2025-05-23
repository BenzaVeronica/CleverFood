import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

export type UserRole = 'admin' | 'user';

export type AuthState = {
    role: UserRole | null;
    email: string;
};
const initialState: AuthState = {
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
    },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;
