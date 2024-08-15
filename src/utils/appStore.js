import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice.js";
import moviesReducer from "./movieSlice.js"
import gptReducer from "./gptSlice.js";
import configReducer from './configSlice.js'

const appStore=configureStore({
        reducer:{ 
            user:useReducer,
            movies:moviesReducer,
            gpt:gptReducer,
            config:configReducer,
        },
    });

export default appStore ;