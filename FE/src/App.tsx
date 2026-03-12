import { use, useEffect, useState } from "react";
import { BASE_NODE_URL } from "./api/base_url";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./api/apiRtk/productsApiSlice";

function App() {
  const { data, isLoading, isError, error } = useGetProductsQuery({});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState(0);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setProducts(data);
    }
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h2>Products</h2>
          {products.map((product: any) => (
            <div
              key={product._id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <p style={{ color: "white", marginRight: "30px" }}>
                {product.name}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "30px",
                }}
              >
                <div
                  onClick={() =>
                    updateProduct({
                      id: product._id,
                      body: { ...product, quantity: product.quantity - 1 },
                    })
                  }
                >
                  -
                </div>
                <p
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {product.quantity}
                </p>
                <div
                  onClick={() =>
                    updateProduct({
                      id: product._id,
                      body: { ...product, quantity: product.quantity + 1 },
                    })
                  }
                >
                  +
                </div>
              </div>

              <div
                onClick={() => deleteProduct({ id: product._id })}
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
              >
                x
              </div>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="product name"
            value={newProductName}
            onChange={(v) => {
              setNewProductName(v.target.value);
            }}
          />
          <input
            type="number"
            placeholder="quantity"
            value={newProductQuantity}
            onChange={(v) => {
              setNewProductQuantity(+v.target.value);
            }}
          />
        </div>
        <div className="card">
          <button
            onClick={() =>
              createProduct({
                body: {
                  _id: crypto.randomUUID(),
                  name: newProductName,
                  quantity: newProductQuantity,
                },
              })
            }
          >
            Create product
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
