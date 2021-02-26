import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const url = "http://localhost:3000/";

  const [products, setProducts] = useState([]);

  const [reviews, setReviews] = useState([]);

  const getProducts = () => {
    fetch(url + "/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };

  const getReviews = (id) => {
    console.log("get");
    fetch(url + "/products/" + id + "/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      });
  };

  const 

  const handleClick = (id) => {
    getReviews(id);
    console.log("hello");
  };

  useEffect(() => getProducts(), []);

  return (
    <div className="App">
      Hello
      {products.map((product, index) => (
        <>
          <article key={index}>
            <h1>{product.name}</h1>
            <h1>{product.price}</h1>
            <button onClick={() => handleClick(product.id)}>
              <img src={product.img} alt="none" />
            </button>
          </article>
        </>
      ))}
      {reviews.map((review, index) => {
        return (
          <article key={index}>
            <h1>{review.title}</h1>
            <h1>{review.content}</h1>
            <h1>{review.author}</h1>
          </article>
        );
      })}
    </div>
  );
}

export default App;
