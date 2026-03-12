import { apiSlice } from "./apiSlice";
import ApiEndpoints from "./endpoints";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //////// GET PRODUCTS ////////////////////////////////////////////////////////
    getProducts: builder.query({
      query: () => ({
        url: ApiEndpoints.products,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    //////// CREATE PRODUCT ////////////////////////////////////////////////////////

    createProduct: builder.mutation({
      query: ({ body }: { body: any }) => ({
        url: ApiEndpoints.products,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    ////// DELETE PRODUCT ////////////////////////////////////////////////////////
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `${ApiEndpoints.products}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    ////// UPDATE PRODUCT ////////////////////////////////////////////////////////

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ApiEndpoints.products}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
