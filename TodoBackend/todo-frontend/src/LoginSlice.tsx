import { createSlice } from "@reduxjs/toolkit";

const loginInSlice = createSlice({

    name: "LoginStateManager",
    
    initialState: {
        userDetails : {name: null, token: null}, // not too sure if it's a good idea to keep token here? 
    },
    
    reducers: {
        
        setLoggedInUser: (state, param) => {
            state.userDetails = param.payload;
        }    
    }
});

export const setLoggedInUser = loginInSlice.actions.setLoggedInUser;;
export const reducer = loginInSlice.reducer;