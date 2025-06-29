export enum EndpointNames {
    GET_RECIPES = 'getRecipes',
    GET_RECIPE = 'getRecipeById',
    GET_RECIPES_BY_SUBCATEGORY = 'getRecipesBySubcategoryId',
    GET_RECIPES_BY_USER = 'getRecipesByUserId',
    CREATE_RECIPE = 'createRecipe',
    CREATE_RECIPE_DRAFT = 'createRecipeDraft',
    UPDATE_RECIPE_DRAFT = 'updateRecipeDraft',
    UPDATE_RECIPE = 'updateRecipe',
    DELETE_RECIPE = 'deleteRecipe',
    LIKE_RECIPE = 'likeRecipeBy',
    BOOKMARK_RECIPE = 'bookmarkRecipeBy',
    RECOMMEND_RECIPE = 'recommendRecipeBy',

    GET_NAV_TREE = 'getNavTree',

    UPLOAD_FILE = 'uploadFile',

    SIGH_UP = 'registerUser',
    LOGIN = 'login',
    GET_REFRESH = 'getRefreshToken',
    GET_CHECK_AUTH = 'getCheckAuth',
    GET_VERIFY = 'getVerify',
    FORGOT_PASSWORD = 'postForgetPswByEmail',
    VERIFY_OTP = 'verifyOtp',
    RESET_PASSWORD = 'resetPassword',

    USERS_TOGGLE_SUBSCRIPTION = 'toggleSubscription',
    GET_USERS = 'getAllUsers',
    GET_USER_ME = 'getUserMe',
    CREATE_USERS_NOTES = 'createUsersNotes',
    DELETE_USERS_NOTES = 'deleteUsersNotes',
    UPDATE_USERS_UPDATE_ME_INFO = 'updateUserInfo',
    UPDATE_USERS_UPDATE_ME_PSW = 'updateUserPassword',
    CREATE_USERS_PHOTO = 'createUserPhoto',
    DELETE_USER = 'deleteProfile',

    GET_BLOGGERS = 'getAllBloggers',
    GET_BLOGGER_BY_ID = 'getBloggerById',

    GET_MEASURE_UNITS = 'getAllMeasureUnits',

    GET_STATISTIC = 'getStatistic',
}
