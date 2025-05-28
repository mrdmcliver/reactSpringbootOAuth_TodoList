import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './LoginSlice'

const store = configureStore({
    reducer: {
        loggedInUser: reducer
    }
});

export default store;