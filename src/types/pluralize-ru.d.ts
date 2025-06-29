declare module 'pluralize-ru' {
    function pluralize(
        count: number,
        form1: string,
        form2: string,
        form3: string,
        form4: string,
    ): string;

    export = pluralize;
}
