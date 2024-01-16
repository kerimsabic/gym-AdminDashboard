import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, token } from "@/utils/data";
import { Member } from "@/utils/types";


const BEARER_TOKEN = `${token}`;


export const membersApi = createApi({
    reducerPath: 'membersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }),
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