import type { ApplicationState } from '../configure-store';

export const selectAuthToken = (state: ApplicationState): string => state.auth.tokenAccess;
export const selectAuthEmail = (state: ApplicationState): string => state.auth.email;
