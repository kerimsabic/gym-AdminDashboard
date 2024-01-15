import appAxios from "@/services/appAxios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userInfo } from "os"

const initialState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export const registerAdmin = createAsyncThunk(
    'auth/registerAdmin', // action type used to make the request in Redux Query
    async (data, { rejectWithValue }) => {
        try {
            await appAxios.post('/auth/register', data)
        }
        catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }

        }
    }
)

export default authSlice.reducer;