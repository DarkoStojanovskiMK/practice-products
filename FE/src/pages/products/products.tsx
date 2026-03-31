import { useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../api/apiRtk/productsApiSlice";
import { useSelector } from "react-redux";
import {selectUserSession } from "../../api/apiRtk/auth/authSlice";
import Header from "../../components/header/header";

function Products() {
  const session = useSelector(selectUserSession);
  const { data } = useGetProductsQuery({token: session?.access_token ?? ''});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState(0);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleCreateProduct = async () => {
    if (!newProductName || newProductQuantity < 0) {
      alert("Please enter a valid product name and quantity.");
      return;
    }
    createProduct({token: session?.access_token ?? '',
      body: {
        _id: crypto.randomUUID(),
        name: newProductName,
        quantity: newProductQuantity,
      },
    });
  };

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
                      token: session?.access_token ?? '',
                      id: product._id,
                      body: {
                        ...product,
                        quantity:
                          product.quantity > 0 ? product.quantity - 1 : 0,
                      },
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
                      token: session?.access_token ?? '',
                      id: product._id,
                      body: {
                        ...product,
                        quantity:
                          product.quantity < 100 ? product.quantity + 1 : 100,
                      },
                    })
                  }
                >
                  +
                </div>
              </div>

              <div
                onClick={() => deleteProduct({token: session?.access_token ?? '', id: product._id })}
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
            min={0}
            max={100}
            onChange={(v) => {
              setNewProductQuantity(
                +v.target.value > 100 ? 100 : +v.target.value,
              );
            }}
          />
        </div>
        <div className="card">
          <button onClick={handleCreateProduct}>Create product</button>
        </div>
       
      </div>
    </>
  );
}

export default Products;
