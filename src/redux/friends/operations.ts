import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Friends } from '../../components/App/types';
import axios from 'axios';

export const getFriends = createAsyncThunk<Friends[]>(
    'friends/all',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('/friends');
            return res.data;
        } catch (error) {
            let message = 'Unknown error';

            if (error instanceof Error) {
                message = error.message;
            }

            return thunkAPI.rejectWithValue(message);
        }
    },
);
