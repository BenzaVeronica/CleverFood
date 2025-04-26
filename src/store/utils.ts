export function addIdToArray<T>(arr: T[]): (T & { id: string })[] {
    return arr.map((item, index) => ({
        id: `${index + 1}`,
        ...item,
    }));
}
