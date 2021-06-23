import ajax from './ajax'

const BASE_URL = '/api'

export const reqShops = () => ajax(BASE_URL + '/shops')
export const reqShopDetail = (name) => ajax(BASE_URL + '/detail', {name})
export const reqBestFoods = () => ajax(BASE_URL + '/best')
export const reqConfirmOrder = (order) => ajax(BASE_URL + '/users/saveOrder', order, 'post')
export const reqOrders = (username) => ajax(BASE_URL + '/users/orders', {username})
export const reqWriteComment = (comment) => ajax(BASE_URL + '/users/write', comment, 'post')
export const reqComments = (username) => ajax(BASE_URL + '/users/comments', {username})
export const reqSearch = (search) => ajax(BASE_URL + '/search', {search})
export const reqSales = (foodName, count) => ajax(BASE_URL + '/users/sales', {food_name: foodName, count: count})
