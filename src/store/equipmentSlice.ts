import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL,  } from "@/utils/data";



export const equipmentApi = createApi({
    reducerPath: 'equipmentApi',
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
        getEquipmentId: builder.query<any, string>({
            query: (id) => `/equipment/${id}`,
            providesTags: (_result, _error, id) => [{ type: "equipmentApi", id }],
        }),
        
        updateEquipment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/equipment/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["equipmentApi"],
        }),

        serviceEquipment: builder.mutation({
            query: ({ id}) => ({
                url: `/equipment/service/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["equipmentApi"],
        }),
        deleteEquipment: builder.mutation({
            query: ({ id }) => ({ url: `/equipment/${id}`, method: "DELETE" }),
            invalidatesTags: ["equipmentApi"],
        }),
    })
})



// Export hooks for usage in components
export const { useGetEquipmentsQuery, useAddAttendanceMutation, useUpdateEquipmentMutation, useGetEquipmentIdQuery, useDeleteEquipmentMutation, useServiceEquipmentMutation } = equipmentApi;


export default equipmentApi;