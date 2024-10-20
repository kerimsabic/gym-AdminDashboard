import { BASE_URL, /*token*/ } from "@/utils/data";
import { Trainer } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";  //ovje treabao dodati /react poslije query


/*const BEARER_TOKEN = `${token}`;*/



export const trainerApi=createApi({
    reducerPath:"trainerApi",
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
    tagTypes: ["trainerApi"],
    endpoints:(builder)=>({
        getTrainers : builder.query<Trainer[], undefined>({
            query:()=> "/trainers/",
            providesTags: ["trainerApi"],
        }),
        addTrainer: builder.mutation({
          query:(data)=>({
            url: '/auth/registerTrainer',
            method:'POST',
            body: data
          }),
          invalidatesTags: ["trainerApi"],
        }),
        updateTrainer: builder.mutation({
          query: ({ id, data }) => ({ 
              url: `/trainers/${id}`,
              method: "PUT",
              body: data
          }),
          invalidatesTags: ["trainerApi"],
      }),
      deleteTrainer: builder.mutation({
        query: ({ id }) => ({ url: `/trainers/${id}`, method: "DELETE" }),
        invalidatesTags: ["trainerApi"],
    }),
    })
})

export const useTrainerQuery=trainerApi.endpoints.getTrainers.useQuery;
//export const {useGetTrainersQuery}=trainerApi ovo je druga opcija
export const {useAddTrainerMutation,useDeleteTrainerMutation,useUpdateTrainerMutation }= trainerApi;

export const searchSlice = createSlice({
    name: "search",
    initialState: {
      search: "",
    },
    reducers: {
      setSearch: (state, action: PayloadAction<string>) => {
        state.search = action.payload;
      },
    },
  });
export const { setSearch } = searchSlice.actions;


export default trainerApi;


