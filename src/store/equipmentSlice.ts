import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";
import { Membership } from "@/utils/types";


export const equipmentApi = createApi({
    reducerPath: 'equipmentApi',
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
    tagTypes: ["equipmentApi"],
    endpoints: (builder) => ({
        getEquipments: builder.query<any, void>({
            query: () => "/equipment/",
            providesTags: ["equipmentApi"],
        }),
        addAttendance: builder.mutation({
            query: (data) => ({
                url: "/equipment/add",
                method: "POST",
                body: {
                    memberId: data.memberId
                },
                
                
            }),
            invalidatesTags: ["equipmentApi"],
           
        }),
        getAttendanceId: builder.query<any, string>({
            query: (id) => `/equipment/${id}`,
            providesTags: (result, error, id) => [{ type: "equipmentApi", id }],
        }),
        
        updateAttendace: builder.mutation({
            query: ({ id, data }) => ({
                url: `/equipment/add/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["equipmentApi"],
        }),
        deleteAttendace: builder.mutation({
            query: ({ id }) => ({ url: `/equipment/${id}`, method: "DELETE" }),
            invalidatesTags: ["equipmentApi"],
        }),
    })
})



// Export hooks for usage in components
export const { useGetEquipmentsQuery, useAddAttendanceMutation, useUpdateAttendaceMutation, useGetAttendanceIdQuery, useDeleteAttendaceMutation } = equipmentApi;


export default equipmentApi;