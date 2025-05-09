export enum ErrorDescEnum {
    LATER = 'Попробуйте немного позже',
    SEARCH = 'Попробуйте поискать снова попозже',
}
export enum ErrorEnum {
    SLIDER = 'Ошибка загрузки рецептов для слайдера',
    POPULAR = 'Ошибка загрузки блока "Сочное"',
    RELEVANT_KITCHEN = 'Ошибка загрузки блока рекомендованная кухня',
}
export const ErrorStatusMap: Record<number, string> = {
    0: 'Неизвестная ошибка',
    // 404: 'Ошибка: Не найден серверный путь',
    404: 'Ошибка сервера',
    500: 'Ошибка сервера',
};
export const ErrorStringStatusMap: Record<string, string> = {
    // FETCH_ERROR: 'Ошибка fetch запроса',
    FETCH_ERROR: 'Ошибка сервера',
    PARSING_ERROR: 'Ошибка pars запроса',
    TIMEOUT_ERROR: 'Ошибка timeout запроса',
    CUSTOM_ERROR: 'Ошибка запроса',
};
// export enum ImageText {
// ERROR = 'Упс! Такой страницы нет',
// }
