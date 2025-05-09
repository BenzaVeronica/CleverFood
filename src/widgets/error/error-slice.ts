import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ErrorItem = {
    id: number;
    title: string;
    description?: string;
    //   status?: 'error' | 'info' | 'success' | 'warning';
};

type ErrorState = {
    list: ErrorItem[];
};

const initialState: ErrorState = {
    list: [],
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        addError: (state, action: PayloadAction<Omit<ErrorItem, 'id'>>) => {
            state.list.push({
                ...action.payload,
                id: Date.now(),
            });
        },
        removeError: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((err) => err.id !== action.payload);
        },
        resetErrors: (state) => {
            state.list = [];
        },
    },
});

export const { addError, removeError, resetErrors } = errorSlice.actions;
export default errorSlice.reducer;
