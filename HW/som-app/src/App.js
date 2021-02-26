import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Form from "./Form"

function App() {
  const url = "http://localhost:3000";

  const [products, setProducts] = useState([]);

  const [reviews, setReviews] = useState([]);

  let selectedItem = 0;

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

  const emptyReview = {
    title: "",
    content: "",
    author: "",
  }

  const handleCreate =(newReview, id) => {
    fetch(url + "/products/" + id + "/reviews", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReview)
    })
    .then(() => {
      getReviews(id)
    })
  }

  const handleClick = (id) => {
    getReviews(id);
    console.log("hello");
  };

  const handleClickReview = (id) => {
    selectedItem = id
  }

  const removeReview = (product, review) => {
    fetch(url + "/products/" + product + "/reviews/" + review, {
      method: "delete"
    })
    .then(() => getReviews(review))

  }

  useEffect(() => getProducts(), []);

  return (
  
    <div className="App">
      Hello
      
        <Switch>
          <Route exact path="/" render={(rp) => <>
        {products.map((product, index) => (
          <>
            <article key={index}>
              <h1>{product.name}</h1>
              <h1>{product.price}</h1>
              <button onClick={() => handleClick(product.id)}>
                <img src={product.img} alt="none" />
              </button>
              <Link to="/review">
                <button onClick={() => handleClickReview(product.id)}>
                  Write Review
                </button>
              </Link>
            </article>
          </>
        ))}
        {reviews.map((review, index) => {
          return (
            <article key={index}>
              <h1>{review.title}</h1>
              <h1>{review.content}</h1>
              <h1>{review.author}</h1>
              <button onClick={() => removeReview(review.product_id, review.id)}>Remove</button>
            </article>
          );
        })}
        </>
      } />
        <Route exact path="/review" render={(rp) => (<Form {...rp} review={emptyReview} itemId={selectedItem} handleCreate={handleCreate}/>)}/>
        </Switch>

      
    </div>

  );
}

export default App;
