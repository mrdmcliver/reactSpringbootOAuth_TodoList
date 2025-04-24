import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice'

const store = configureStore({
    reducer: {
        loggedInUser: loginReducer
    }
});

export default store;