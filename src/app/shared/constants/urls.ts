const BASE_URL = "http://localhost:5000";

export const FOODS_URL = BASE_URL + '/api/foods';

export const FOOD_TAGS_URL = FOODS_URL + '/tags';

export const FOODS_BY_SEARCH_URL = FOODS_URL +'/search/';

export const FOODS_BY_Tag_URL = FOODS_URL +'/tags/';

export const FOODS_BY_ID_URL = FOODS_URL +'/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';

export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDER_URL = BASE_URL + '/api/orders';

export const ORDER_CREATE_URL = ORDER_URL + '/create';

export const ORDER_NEW_FOR_CURRENTUSER_CREATE_URL = ORDER_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDER_URL + '/pay';