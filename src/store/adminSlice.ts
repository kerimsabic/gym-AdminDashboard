import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/utils/data";
import { Admin } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZXJpbTIiLCJpYXQiOjE3MDUzMTkzMzEsImV4cCI6MTcwNTM1NTMzMX0.CP742_LKQgCRZKGyUe7zRVLoQgtU6U009yRUGMghMpA';


export const adminSlice = createApi({
    reducerPath: 'admins',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }),
    tagTypes: ["admins"],
    endpoints: (builder) => ({
        getAdmins: builder.query<any, void>({
            query: () => "/users/admins",
            providesTags: ["admins"],
        }),
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/auth/registerAdmin",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["admins"],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["admins"],
        }),
        deleteAdmin: builder.mutation({
            query: ({ id }) => ({ url: `/users/${id}`, method: "DELETE" }),
            invalidatesTags: ["admins"],
        }),
    })
})



// Export hooks for usage in components
export const { useGetAdminsQuery, useAddAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation } = adminSlice;


export default adminSlice;