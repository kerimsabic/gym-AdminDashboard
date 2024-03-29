import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";
import { Member } from "@/utils/types";

interface ListResponse<Member> {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Member[]
  }

//const userToken = localStorage.getItem('userToken') || '';


export const adminSlice = createApi({
    reducerPath: 'admins',
    baseQuery: (args, api:any, extraOptions) => {
        const { userToken } = api.getState().auth; // Assuming the auth slice has userToken
        const headers = {
          'authorization':`Bearer ${userToken}`
        };    
        return fetchBaseQuery({
          baseUrl: BASE_URL,
          headers,
        })(args, api, extraOptions);
      },
    tagTypes: ["admins"],
    endpoints: (builder) => ({
        getAdmins: builder.query<any, void>({
            query: () => "/users/admins",
            providesTags: ["admins"],
        }),
        getAdminsPagin: builder.query<ListResponse<Member>, number | void>({
            query: (page = 1) => `/members/pagination/?page=${page}`, // Adjust the URL to include the page parameter
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
                url: `/auth/updateAdmin/${id}`,
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
export const { useGetAdminsQuery, useAddAdminMutation, useUpdateAdminMutation, useDeleteAdminMutation, useGetAdminsPaginQuery } = adminSlice;


export default adminSlice;