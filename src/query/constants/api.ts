export enum ApiEndpoints {
    HEALTH = '/health/',
    RECIPE = '/recipe',
    RECIPE_CATEGORY = '/recipe/category',
    CATEGORY = '/category',
    FILE = '/file/',
    AUTH = '/auth/',
    USERS = '/users/',
    MEASURE_UNITS = '/measure-units/',
}

// export default {
//     getDetail: ( buildObj, property, id, params = initialParams) => {
//       const mergedParams  = { ...params, filter: JSON.stringify([{ "property": property, "value": id, "operator": "=", "disableOnEmpty": true }]) };
//       return axiosInstance.get(`/cls/${buildObj}`, {params: mergedParams })
//     },
//     areas: {
//       getAll: (params = initialParams) => axiosInstance.get(`/cls/area`, { params }),
//       getById: ({ id, params = initialParams }) => axiosInstance.get(`/cls/area/${id}`, { params }),
//       create: (item) => axiosInstance.post(`/cls/area`, item),
//       update: (item) => axiosInstance.put(`/cls/area/${item.Id}`, item),
//       deleteById: (id) => axiosInstance.delete(`/cls/area/${id}`),
//     },
// }
