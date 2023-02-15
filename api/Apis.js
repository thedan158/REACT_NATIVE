export const getAPIs = {
  login: {
    name: "login",
    path: "/api/auth/login",
    method: "POST",
  },
  postMainCourse: {
    name: "Post Main Course",
    path: "/api/food/getAllFoodWithType",
    method: "POST",
  },
  postDesertAndDrink: {
    name: "Post Desert And Drink",
    path: "/api/food/getAllFoodWithType",
    method: "POST",
  },
  register: {
    name: "register",
    path: "/api/auth/register",
    method: "POST",
  },
  sendOtp: {
    name: "sendOtp",
    path: "/api/otp/sendOtp",
    method: "POST",
  },
  verifyOtp: {
    name: "verifyOtp",
    path: "/api/otp/verifyOtp",
    method: "POST",
  },
  checkRestaurant: {
    name: "checkRestaurant",
    path: "/api/auth/hasNoRestaurant",
    method: "POST",
  },
  createRestaurant: {
    name: "createRestaurant",
    path: "/api/restaurant/createRestaurant",
    method: "POST",
  },
  updateUser: {
    name: "updateUser",
    path: "/api/auth/updateUser",
    method: "PUT",
  },
  getAllFoodWithType: {
    name: "updateUser",
    path: "/api/food/getAllFoodWithType",
    method: "POST",
  },
  addFood: {
    name: "addFood",
    path: "/api/food/addFood",
    method: "POST",
  },
};
