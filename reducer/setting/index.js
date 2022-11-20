import { darkTheme, lightTheme } from "../../assets/Theme";

const initialState = {
  countries: [],
  documentType: [],
  theme: lightTheme,
};

export default function SettingReducer(state = initialState, action) {
  switch (action.type) {
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
