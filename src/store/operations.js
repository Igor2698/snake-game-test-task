import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = 'https://snakegame-back-4.onrender.com/';





export const addDates = createAsyncThunk('gamer/addDates',
    async (credentials, thunkAPI) => {

        try {
            console.log(credentials)
            const response = await axios.post('gamer', credentials);
            return response.data;
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.status);
        }
    })


export const getDates = async () => {
    try {
        const response = await axios.get('gamer');
        return response.data;
    } catch (error) {
        console.error('Error fetching dates:', error);
        throw error;
    }
};