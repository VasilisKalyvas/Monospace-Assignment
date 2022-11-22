import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const getUsers = createAsyncThunk(
    "users/getUsers", 
    async () =>{
        try {
            const { data } = await axios.get("https://vasilis.users.challenge.dev.monospacelabs.com/users")
            return data;
        } catch (error) {
            console.log(error)
        }
    }
);


const usersSlice = createSlice(({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        status: null,
    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.loading = true
            state.status = "pending"
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
            state.status = "success"
        },
        [getUsers.rejected]: (state) => {
            state.loading = false
            state.status = "failed"
        },
    },
}));

export default usersSlice.reducer;