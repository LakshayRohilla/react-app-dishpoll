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