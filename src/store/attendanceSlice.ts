import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";
import { Membership } from "@/utils/types";


export const attendanceApi = createApi({
    reducerPath: 'attendanceApi',
    baseQuery: (args, api, extraOptions) => {
        const { userToken } = api.getState().auth; // Assuming the auth slice has userToken
        const headers = {
          'authorization':`Bearer ${userToken}`
        };    
        return fetchBaseQuery({
          baseUrl: BASE_URL,
          headers,
        })(args, api, extraOptions);
      },
    tagTypes: ["attendanceApi"],
    endpoints: (builder) => ({
        getAttendance: builder.query<any, void>({
            query: () => "/attendance/",
            providesTags: ["attendanceApi"],
        }),
        addAttendance: builder.mutation({
            query: (data) => ({
                url: "/attendance/add",
                method: "POST",
                body: {
                    memberId: data.memberId
                },
                
                
            }),
            invalidatesTags: ["attendanceApi"],
           
        }),
        getAttendanceId: builder.query<any, string>({
            query: (id) => `/attendance/${id}`,
            providesTags: (result, error, id) => [{ type: "attendanceApi", id }],
        }),
        
        updateAttendace: builder.mutation({
            query: ({ id, data }) => ({
                url: `/attendance/add/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["attendanceApi"],
        }),
        deleteAttendace: builder.mutation({
            query: ({ id }) => ({ url: `/attendance/${id}`, method: "DELETE" }),
            invalidatesTags: ["attendanceApi"],
        }),
    })
})



// Export hooks for usage in components
export const { useGetAttendanceQuery, useAddAttendanceMutation, useUpdateAttendaceMutation, useGetAttendanceIdQuery, useDeleteAttendaceMutation } = attendanceApi;


export default attendanceApi;