export function addIdToArray<T>(arr: T[]): (T & { id: number })[] {
    return arr.map((item, index) => ({
        id: index + 1,
        ...item,
    }));
}
