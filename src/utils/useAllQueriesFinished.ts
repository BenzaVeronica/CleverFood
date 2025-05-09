export const useAllQueriesFinished = (queries: { isLoading: boolean }[]) => {
    const allFinished = !queries.some((query) => query.isLoading);
    return allFinished;
};
