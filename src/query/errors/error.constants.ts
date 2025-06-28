export enum ErrorDescEnum {
    AGAIN = 'Попробуйте снова',
    LATER = 'Попробуйте немного позже',
    SEARCH = 'Попробуйте поискать снова попозже',
}
export enum ErrorEnum {
    SLIDER = 'Ошибка загрузки рецептов для слайдера',
    POPULAR = 'Ошибка загрузки блока "Сочное"',
    RELEVANT_KITCHEN = 'Ошибка загрузки блока рекомендованная кухня',
    EMAIL = 'Такого e-mail нет',
}
export const ErrorStringStatusMap: Record<string, string> = {
    FETCH_ERROR: 'Не удалось загрузить данные',
    PARSING_ERROR: 'Ошибка обработки ответа сервера',
    TIMEOUT_ERROR: 'Сервер не ответил вовремя',
    CUSTOM_ERROR: 'Неизвестная ошибка',
    CLIENT_ERROR: 'Клиентская ошибка',
};
// export enum ImageText {
// ERROR = 'Упс! Такой страницы нет',
// }

export const TOAST_MESSAGE = {
    ClientErrorToast: {
        title: 'Клиентская ошибка',
        description: 'Ошибка при выполнении запроса',
    },
    ServerErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте немного позже.',
    },
    ShortServerErrorToast: {
        title: 'Ошибка сервера',
        description: 'Попробуйте позже.',
    },
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
    RestorePsw: {
        [200]: {
            title: 'Смена пароля успешна',
            description: '',
        },
        inccorect: {
            title: 'Не верный пароль',
            description: '',
        },
        match: {
            title: 'Новый и старый пароль совпадают',
            description: '',
        },
    },
    NoteCreate: {
        [200]: {
            title: 'Заметка опубликована',
            description: '',
        },
    },
    NoteDelete: {
        [200]: {
            title: 'Заметка удалена',
            description: '',
        },
    },
    UpdateProfileInfo: {
        [200]: {
            title: 'Обновлено!',
            description: '',
        },
    },
    ProfilePhotoUpdate: {
        [200]: {
            title: 'Фото загружено',
            description: '',
        },
    },
    RecipeDraftCreate: {
        [200]: {
            title: 'Черновик успешно сохранен',
            description: '',
        },
        [500]: {
            title: 'Ошибка сервера',
            description: 'Не удалось сохранить черновик рецепта',
        },
    },
    RecipeCreate: {
        [200]: {
            title: 'Рецепт успешно опубликован',
            description: '',
        },
        [409]: {
            title: 'Ошибка',
            description: 'Рецепт с таким названием уже существует',
        },
        [500]: {
            title: 'Ошибка сервера',
            description: 'Попробуйте пока сохранить в черновик',
        },
    },
    RecipeDelete: {
        [200]: {
            title: 'Рецепт успешно удален',
            description: '',
        },
        [500]: {
            title: 'Ошибка сервера',
            description: 'Не удалось удалить рецепт',
        },
    },
} as const;
