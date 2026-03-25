import { apiSlice } from "./apiSlice";
import ApiEndpoints from "./endpoints";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //////// GET PRODUCTS ////////////////////////////////////////////////////////
    getProducts: builder.query({
      query: ({token}: {token: string}) => ({
        url: ApiEndpoints.products,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
     
      providesTags: ["Products"],
    }),

    //////// CREATE PRODUCT ////////////////////////////////////////////////////////

    createProduct: builder.mutation({
      query: ({ token, body }: { token: string; body: any }) => ({
        url: ApiEndpoints.products,
        method: "POST",
         headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    ////// DELETE PRODUCT ////////////////////////////////////////////////////////
    deleteProduct: builder.mutation({
      query: ({token, id } : {token: string; id: string}) => ({
        url: `${ApiEndpoints.products}/${id}`,
        method: "DELETE",
         headers: {
          Authorization: `Bearer ${token}`,
        }
      }),
      invalidatesTags: ["Products"],
    }),

    ////// UPDATE PRODUCT ////////////////////////////////////////////////////////

    updateProduct: builder.mutation({
      query: ({token, id, body }: {token: string; id: string; body: any}) => ({
        url: `${ApiEndpoints.products}/${id}`,
        method: "PUT",
         headers: {
          Authorization: `Bearer ${token}`,
        },
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
