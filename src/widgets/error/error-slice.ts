import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertStatus = 'error' | 'success' | 'info' | 'warning';

type ErrorItem = {
    id: number;
    title: string;
    status: 'error' | 'success' | 'info' | 'warning';
    description?: string;
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
        addSuccess: (state, action: PayloadAction<Omit<ErrorItem, 'id' | 'status'>>) => {
            state.list.push({
                ...action.payload,
                status: 'success',
                id: Date.now(),
            });
        },
        addError: (state, action: PayloadAction<Omit<ErrorItem, 'id' | 'status'>>) => {
            state.list.push({
                ...action.payload,
                status: 'error',
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

export const { addError, addSuccess, removeError, resetErrors } = errorSlice.actions;
export default errorSlice.reducer;
