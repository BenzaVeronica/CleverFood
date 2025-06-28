export enum EndpointUrl {
    RECIPE = '/recipe',
    RECIPE_CATEGORY = '/recipe/category',
    RECIPE_USER = '/recipe/user',
    RECIPE_DRAFT = '/recipe/draft',

    CATEGORY = '/category',

    FILE_UPLOAD = '/file/upload',

    AUTH_SIGH_UP = '/auth/signup',
    AUTH_LOGIN = '/auth/login',
    AUTH_GET_REFRESH = '/auth/refresh',
    AUTH_GET_CHECK_AUTH = '/auth/check-auth',
    AUTH_GET_VERIFY = '/auth/verify',
    AUTH_FORGOT_PASSWORD = '/auth/forgot-password',
    AUTH_VERIFY_OTP = '/auth/verify-otp',
    AUTH_RESET_PASSWORD = '/auth/reset-password',

    USERS_TOGGLE_SUBSCRIPTION = '/users/toggle-subscription',
    USERS_GET_ALL = '/users/all',
    USERS_ME = '/users/me',
    USERS_NOTES = '/users/me/note',
    USERS_UPDATE_ME_INFO = '/users/me/update-info',
    USERS_UPDATE_ME_PSW = '/users/me/update-password',
    USERS_ME_PHOTO = '/users/me/photo',
    PROFILE = '/profile',

    BLOGGERS = '/bloggers',

    MEASURE_UNITS = '/measure-units',

    STATISTIC = '/statistic',
}
