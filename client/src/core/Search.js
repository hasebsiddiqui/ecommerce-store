import React, { useState, useEffect } from "react";

import Card from "./Card";
import { getCategories, list } from "./apiCore";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setData({ ...data, categories: data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    //console.log(search, category);
    if (search) {
      list({
        search: search || undefined,
        category: category,
      })
        .then((response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return "No product found";
    }
  };

  //noresults than results = []
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row homecard">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        {
          //This span tag is so that elements remain inline
        }
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append" style={{ boarder: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
