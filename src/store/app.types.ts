import { rootReducer, store } from './configure-store';

export type ApplicationState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
