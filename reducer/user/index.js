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
    /* falls through */
    default:
      return state;
  }
}
