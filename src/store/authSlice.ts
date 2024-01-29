import { AdminsRegistrationForm } from "@/components/AdminsForm/AdminsForm"
import { LogInFormData } from "@/pages/LogIn"
import appAxios from "@/services/appAxios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
//import { useAddAdminMutation } from "./adminSlice"

//const [addAdmin]=useAddAdminMutation();

const initialState = {
    loading: false,
    userInfo: null,
    userToken: localStorage.getItem('userToken')||null,     //ovdje sam morao dodati localStoreage.getItem jer na refresh je bio unauthotized access a token bio u local storage
    error: null,
    success: false,
}

/*const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null*/


    export const registerAdmin = createAsyncThunk(
        'auth/registerAdmin',
        async (data: AdminsRegistrationForm, { rejectWithValue }) => {
            try {
                await appAxios.post(
                    '/auth/registerAdmin',
                    data,
                );
                
            } catch (error: any) {
                // return custom error message from backend if present
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }
        }
    )

    export const fetchAdmins = createAsyncThunk('admin/fetchAdmins', async () => {
        try {
            const response = await appAxios.get('/api/admins');
            return response.data;
        } catch (error) {
            throw error;
        }
    });

export const login = createAsyncThunk(
    'auth/login',
    async (body: LogInFormData, { rejectWithValue }) => {
        try {
            const { data } = await appAxios.post(
                '/auth/login',
                body,
            )
            localStorage.setItem('userToken', data.jwt)
            return data
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Login user
        builder.addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state, action: any) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.payload.jwt
        })
        builder.addCase(login.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
        // Register user
        builder.addCase(registerAdmin.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(registerAdmin.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(registerAdmin.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer

