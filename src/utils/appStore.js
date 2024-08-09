import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice.js";
import moviesReducer from "./movieSlice.js"

const appStore=configureStore({
        reducer:{ 
            user:useReducer,
            movies:moviesReducer,
        },
    });

export default appStore ;