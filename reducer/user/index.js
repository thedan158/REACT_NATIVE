const initialState = {
  phoneNumber: '',
  username: '',
  fullname: '',
  restaurantID: '',
  imagePath: '',
  address: '',
  email: '',
  status: '',
  role: '',
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'login.reply':
      if (action.data.success === true) {
        return {
          ...state,
          phoneNumber: action.data.data.phoneNumber,
          username: action.data.data.username,
          fullname: action.data.data.fullname,
          restaurantID: action.data.data.restaurantID,
          imagePath: action.data.data.imagePath,
          address: action.data.data.address,
          email: action.data.data.email,
          status: action.data.data.status,
          role: action.data.data.role,
          isLoggedin: true,
        };
      }
    case 'updateUser.reply':
      if (action.data.success === true) {
        return {
          ...state,
          phoneNumber: action.data.data.phoneNumber,
          username: action.data.data.username,
          fullname: action.data.data.fullname,
          restaurantID: action.data.data.restaurantID,
          imagePath: action.data.data.imagePath,
          address: action.data.data.address,
          email: action.data.data.email,
          status: action.data.data.status,
          role: action.data.data.role,
        };
      }
    case 'register.reply':
      if (action.data.success === true) {
        return {
          ...state,
          phoneNumber: action.data.data.phoneNumber,
          username: action.data.data.username,
          fullname: action.data.data.fullname,
          restaurantID: action.data.data.restaurantID,
          imagePath: action.data.data.imagePath,
          address: action.data.data.address,
          email: action.data.data.email,
          status: action.data.data.status,
          role: 'owner',
        };
      }
    case 'logout':
      return {
        ...state,
        isLoggedin: false,
      };
    case 'postMainCourse.reply':
      if (action.data.success === true) {
        return {
          ...state,
          menuMainCourses: action.data.message,
        };
      } else {
        return {
          ...state,
          errorMessage: "Cann't get menu main courses",
        };
      }
    case 'postDesertAndDrink.reply':
      if (action.data.success === true) {
        return {
          ...state,
          menuDesertAndDrinks: action.data.message,
        };
      } else {
        return {
          ...state,
          errorMessage: "Cann't get menu desert and drinks",
        };
      }
    case 'getAllUser.reply':
      if (action.data.success === true) {
        return {
          ...state,
        };
      }
    case 'createUser.reply':
      if (action.data.success === true) {
        return {
          ...state,
        };
      }
    /* falls through */
    default:
      return state;
  }
}
