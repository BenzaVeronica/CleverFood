export const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, '');

export const cmpString = (msg1: string, msg2: string) => normalize(msg1).includes(normalize(msg2));
