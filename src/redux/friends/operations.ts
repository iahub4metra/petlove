import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Friends } from '../../components/App/types';
import axios from 'axios';

type ApiError = {
    message: string;
    status?: number;
};

export const getFriends = createAsyncThunk<
    Friends[],
    void,
    { rejectValue: ApiError }
>('friends/all', async (_, thunkAPI) => {
    try {
        const res = await axios.get('/friends');
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
            });
        }

        return thunkAPI.rejectWithValue({
            message: 'Unknown error',
        });
    }
});
