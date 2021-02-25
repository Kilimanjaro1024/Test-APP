import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react"

function App() {
  const url = "http://localhost:3000/"

  const [products, setProducts] = useState([])

  const getProducts = () => {
    fetch(url + "/products")
      .then((response) => response.json())
      .then((data) =>{
        setProducts(data)
      })
  }

  useEffect(() => getProducts(), [])
  return (
    <div className="App">
      Hello
      {products.map((product, index) =>(
        <article key={index}>
          <h1>{product.name}</h1>
          <h1>{product.price}</h1>
          <img src={product.img} alt="none"/>
        </article>
      ))}
    </div>
  );
}

export default App;
