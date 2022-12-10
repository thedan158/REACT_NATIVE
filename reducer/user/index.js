const initialState = {
  fullname: "",
  userImagePath: "",
  role: "",
  id: "",
  username: "",
  todaySugarLevel: "",
  todayBMI: 0,
  phoneNumber: "",
  isLoggedin: false,
  errorMessage: "",
  restaurantID: "",
  menuMainCourses: [],
  menuDesertAndDrinks: [],
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "login.reply":
      console.log(action.data);
      if (action.data.success === true) {
        return {
          ...state,
          fullname: action.data.message,
          username: action.data.username,
          restaurantID: action.data.restaurantID,
          isLoggedin: true,
        };
      } else {
        return {
          ...state,
          errorMessage: "Wrong username or password",
        };
      }
    case "logout":
      return {
        ...state,
        isLoggedin: false,
      };
    case "postMainCourse.reply":
      if (action.data.success === true) {
        return {
          ...state,
          menuMainCourses: action.data.message,
        }
      }
      else {
        return {
          ...state,
          errorMessage: "Cann't get menu main courses",
        }
      }
    case "postDesertAndDrink.reply": 
      if (action.data.success === true) {
        return {
          ...state,
          menuDesertAndDrinks: action.data.message,
        }
      }
      else {
        return {
          ...state,
          errorMessage: "Cann't get menu desert and drinks",
        }
      }
    /* falls through */
    default:
      return state;
  }
}
