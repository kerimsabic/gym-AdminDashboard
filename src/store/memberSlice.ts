import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";
import { Member } from "@/utils/types";
import { useSelector, useStore } from "react-redux";
import { RootState } from ".";





export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: (args, api, extraOptions) => {
        const { userToken } = api.getState().auth; // Assuming the auth slice has userToken
    
        const headers = {
          'authorization':`Bearer ${userToken}`
          // Add your other headers if needed
        };
    
        /*if (userToken) {
          headers.Authorization = `Bearer ${userToken}`;
        }*/
        console.log(`Bearer ${userToken}`)
    
        return fetchBaseQuery({
          baseUrl: BASE_URL,
          headers,
        })(args, api, extraOptions);
      },
    tagTypes: ["membersApi"],
    endpoints: (builder) => ({
        getMembers: builder.query<Member[], void>({
            query: () => "/members/",
            providesTags: ["membersApi"],
        }),
        addMember: builder.mutation({
            query: (data) => ({
                url: "/auth/registerMember",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["membersApi"],
        }),
        updateMember: builder.mutation({
            query: ({ id, data }) => ({
                url: `/members/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["membersApi"],
        }),
        deleteMember: builder.mutation({
            query: ({ id }) => ({ url: `/members/${id}`, method: "DELETE" }),
            invalidatesTags: ["membersApi"],
        }),
    })
})



// Export hooks for usage in components
export const { useGetMembersQuery, useAddMemberMutation, useUpdateMemberMutation, useDeleteMemberMutation } = membersApi;


export default membersApi;