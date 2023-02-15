import { darkTheme, lightTheme } from "../../assets/Theme";

const initialState = {
  loading: false,
  theme: lightTheme,
};

export default function SettingReducer(state = initialState, action) {
  switch (action.type) {
    case "loading.start":
      return {
        ...state,
        loading: true,
      };
    case "loading.success":
      return {
        ...state,
        loading: false,
      };
    case "getCountry.reply":
      return {
        ...state,
        countries: action.data,
      };
    case "switchTheme":
      if (state.theme === lightTheme) {
        return {
          ...state,
          theme: darkTheme,
        };
      } else {
        return {
          ...state,
          theme: lightTheme,
        };
      }

    default:
      return state;
  }
}
