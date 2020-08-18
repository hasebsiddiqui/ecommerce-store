import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    //Sort by sold
    console.log(error);
    getProducts("sold")
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductsBySell(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadProductsByArrival = () => {
    //Sort by creation date
    getProducts("createdAt")
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductsByArrival(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayProducts = (products) => {
    console.log(products + "fff");
    if (products.length === 0) {
      return <div className="row">No products found</div>;
    }
    return (
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3 homecard">
            <Card key={i} product={product} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>

      {displayProducts(productsByArrival)}

      <h2 className="mb-4">Best Sellers</h2>
      {displayProducts(productsBySell)}
    </Layout>
  );
};

export default Home;
