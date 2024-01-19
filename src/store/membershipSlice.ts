
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";
import { Membership } from "@/utils/types";


export const membershipApi = createApi({
    reducerPath: 'membershipApi',
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
    tagTypes: ["membershipApi"],
    endpoints: (builder) => ({
        getMemberships: builder.query<Membership[], void>({
            query: () => "/membership/",
            providesTags: ["membershipApi"],
        }),
        addMembership: builder.mutation({
            query: (data) => ({
                url: "/membership/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["membershipApi"],
        }),
        getMembershipMemberId: builder.query<Membership, string>({
            query: (id) => `/membership/member/${id}`,
            providesTags: (_result, _error, id) => [{ type: "membershipApi", id }],
        }),
        
        updateMembership: builder.mutation({
            query: ({ id, data }) => ({
                url: `/members/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["membershipApi"],
        }),
        deleteMembership: builder.mutation({
            query: ({ id }) => ({ url: `/membership/${id}`, method: "DELETE" }),
            invalidatesTags: ["membershipApi"],
        }),
    })
})



// Export hooks for usage in components
export const { useAddMembershipMutation, useGetMembershipMemberIdQuery, useDeleteMembershipMutation, useUpdateMembershipMutation, useGetMembershipsQuery } = membershipApi;


export default membershipApi;