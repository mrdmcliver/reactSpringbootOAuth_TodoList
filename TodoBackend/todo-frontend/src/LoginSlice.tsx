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

const { actions, reducer} = loginInSlice;
export const { setLoggedInUser } = actions;
export default reducer;