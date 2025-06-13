export enum EndpointNames {
    // HEALTH = 'health',
    GET_RECIPES = 'getRecipes',
    GET_RECIPE = 'getRecipeById',
    GET_RECIPES_BY_SUBCATEGORY = 'getRecipesBySubcategoryId',
    CREATE_RECIPE = 'createRecipe',
    CREATE_RECIPE_DRAFT = 'createRecipeDraft',
    UPDATE_RECIPE = 'updateRecipe',
    DELETE_RECIPE = 'deleteRecipe',
    GET_RECIPES_BY_USER = 'getRecipeByUserId',
    LIKE_RECIPE = 'likeRecipeBy',
    BOOKMARK_RECIPE = 'bookmarkRecipeBy',

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

    // USERS = 'users',
    USERS_TOGGLE_SUBSCRIPTION = 'toggleSubscription',
    GET_MEASURE_UNITS = 'getAllMeasureUnits',

    GET_BLOGGERS = 'getAllBloggers',
    GET_BLOGGER_BY_ID = 'getBloggerById',
}
