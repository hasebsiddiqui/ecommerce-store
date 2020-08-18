import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD in products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="row" style={{ width: "100%" }}>
                  <div className="col col-4">
                    <strong>{p.name}</strong>
                  </div>
                  <div className="col col-4">
                    <Link to={`/admin/product/update/${p._id}`}>
                      <span className="badge badge-warning badge-pill">
                        Update
                      </span>
                    </Link>
                  </div>
                  <div className="col col-4">
                    <span
                      onClick={() => destroy(p._id)}
                      className="badge badge-danger badge-pill"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
