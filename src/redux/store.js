import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/userSlice";

const store =  configureStore({
    reducer: {
        users: usersReducer
    },
});

export default store;