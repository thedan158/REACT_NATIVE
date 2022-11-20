import { lightTheme } from '../assets/Theme';
import { SWITCH_THEME } from './themeActions';

const initialState = {
  theme: lightTheme,
};

const setting = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return { theme: action.theme };

    default:
      return state;
  }
};

export default setting;
