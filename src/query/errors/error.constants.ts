export enum ErrorDescEnum {
    AGAIN = 'Попробуйте снова',
    LATER = 'Попробуйте немного позже',
    SEARCH = 'Попробуйте поискать снова попозже',
    // EMAIL = 'Попробуйте другой e-mail или проверьте правильность его написания',
    // CHECK_EMAIL = 'Проверьте почту или перейдите по ссылке',
}
export enum ErrorEnum {
    SLIDER = 'Ошибка загрузки рецептов для слайдера',
    POPULAR = 'Ошибка загрузки блока "Сочное"',
    RELEVANT_KITCHEN = 'Ошибка загрузки блока рекомендованная кухня',
    EMAIL = 'Такого e-mail нет',
    // SUCCESS_VERIFICATION = 'Верификация прошла успешно',
    // SUCCESS_RESET_DATA = 'Восстановление данных прошло успешно',
    // INCORRECT_LOGIN_OR_PSW = 'Неверный логин или пароль',
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

export const TOAST_MESSAGE = {
    SignInToast: {
        [401]: {
            title: 'Неверный логин или пароль',
            description: 'Попробуйте снова',
        },
        [403]: {
            title: 'E-mail не верифицирован',
            description: 'Проверьте почту и перейдите по ссылке',
        },
    },
    EmailVerificationToast: {
        [200]: {
            title: 'Верификация прошла успешно',
            description: '',
        },
    },
    SendVerificationCodeToast: {
        [403]: {
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        },
    },
    RestoreCredentials: {
        [200]: {
            title: 'Восстановление данных успешно',
            description: '',
        },
    },
    ServerErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже',
    },
} as const;
