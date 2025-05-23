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

const isDuplicate = (list: ErrorItem[], title: string) =>
    list.some((error) => error.title === title);

const addItem = (
    state: ErrorState,
    payload: Omit<ErrorItem, 'id' | 'status'>,
    status: AlertStatus,
) => {
    if (isDuplicate(state.list, payload.title)) return;
    state.list.push({
        ...payload,
        status,
        id: Date.now(),
    });
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        addSuccess: (state, action: PayloadAction<Omit<ErrorItem, 'id' | 'status'>>) => {
            addItem(state, action.payload, 'success');
        },
        addError: (state, action: PayloadAction<Omit<ErrorItem, 'id' | 'status'>>) => {
            addItem(state, action.payload, 'error');
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
