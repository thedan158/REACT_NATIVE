import { configureStore } from '@reduxjs/toolkit'
import SettingReducer from "../reducer/setting";
import UserReducer from "../reducer/user";

export default configureStore({
    reducer:{
        setting: SettingReducer,
        user: UserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   })
})