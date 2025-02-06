"use client";

import { fetchListOfProducts } from "@/actions";

const { useEffect, useState } = require("react");

export default function ClientPageExample() {
  const [products, setProducts] = useState([]);
  const [loading, setLoadaing] = useState(false);

  async function getListOfProduct() {
    setLoadaing(true);
    const response = await fetchListOfProducts();
    console.log(response);
    if (response) {
      setProducts(response);
      setLoadaing(false);
    }
  }

  useEffect(() => {
    getListOfProduct();
  }, []);

  if (loading) {
    return (
      <div className=" flex min-h-screen items-center justify-center font-bold text-xl text-blue-700">
        Loading.....
      </div>
    );
  }

  return (
    <div>
      <h1>Client Page Server Action Example</h1>
      <ul>
        {products.length > 0
          ? products.map((item) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>
    </div>
  );
}
