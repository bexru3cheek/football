import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryServices = createApi({
  reducerPath: "foodbolltams",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64caafa0700d50e3c7053191.mockapi.io/",
  }),

  // tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ search }) => {
        return `foodbolltams?search=${search}`;
      },
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      // providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => {
        return `foodbolltams/${id}`;
      },
      // providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: "foodbolltams",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Category"],
    }),
    // updateCategory,
    updateCategory: builder.mutation({
      query: (body, id) => ({
        url: `foodbolltams/${id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["Category"],
    }),
    // deleteCategory,
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `foodbolltams/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryServices;

export default categoryServices;
