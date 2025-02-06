// async function fetchListOfProducts() {
//   try {
//     const response = await axios.get("https://dummyjson.com/products");
//     return response.data.products;
//   } catch (error) {
//     console.log("Error while fetching data: " + error);
//   }
// }

import { fetchListOfProducts } from "@/actions";

export default async function ServerActionExample() {
  const products = await fetchListOfProducts();
  // console.log(products);
  return (
    <div>
      <h1>Server Action Example - server components</h1>
      <ul>
        {products.length > 0
          ? products.map((item) => <li key={item.id}>{item.title}</li>)
          : null}
      </ul>
    </div>
  );
}

// export default ServerActionExample;
