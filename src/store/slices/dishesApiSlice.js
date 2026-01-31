import { apiSlice } from "./apiSlice";
import { DISHES_URL } from "../../constants";

export const dishesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => ({
        url: DISHES_URL,
      }),
      providesTags: ['Dishes'],
    }),
  }),
});

export const { useGetDishesQuery } = dishesApiSlice;