// import { EndpointNames } from '../constants/endpoint-names';
// import { MutationApi } from '../types';
// import { userApiSlice } from './user.api';
// import { UserNoteRequest, UserNoteResponse } from './user.types';

// export const addNoteFromCache = async (
//     _newNote: UserNoteRequest,
//     { dispatch, queryFulfilled }: MutationApi<UserNoteResponse>,
// ) => {
//     try {
//         const { data: serverNote } = await queryFulfilled;
//         dispatch(
//             userApiSlice.util.updateQueryData(EndpointNames.GET_USER_ME, undefined, (draft) => {
//                 draft.notes.push(serverNote);
//             }),
//         );
//     } catch {
//         console.error([EndpointNames.CREATE_USERS_NOTES]);
//     }
// };
// export const deleteNoteFromCache = async (
//     id: string,
//     { dispatch, queryFulfilled }: MutationApi<void>,
// ) => {
//     let patchResult;
//     try {
//         patchResult = dispatch(
//             userApiSlice.util.updateQueryData(EndpointNames.GET_USER_ME, undefined, (draft) => {
//                 if (draft?.notes) {
//                     draft.notes = draft.notes.filter((note) => note._id !== id);
//                 }
//             }),
//         );
//         await queryFulfilled;
//     } catch {
//         if (patchResult) {
//             patchResult.undo();
//         }
//     }
// };
