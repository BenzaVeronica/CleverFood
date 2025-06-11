import type { ApplicationState } from '../configure-store';

export const selectAuthEmail = (state: ApplicationState): string => state.auth.email;
export const selectAuthWasLoggedIn = (state: ApplicationState): boolean | null =>
    state.auth.wasLoggedIn;
