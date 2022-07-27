import { Fragment, useEffect, useState } from "react";
const { request, gql } = require("graphql-request");

const endpoint = `http://localhost:5000/graphql/`;

function GetAllProduct() {
  const [products, setProducts] = useState([]);

  const query = gql`
    {
      getAllProduct {
        name
        price
        quantity
        id
      }
    }
  `;

  const product = async () => {
    const data = await request(endpoint, query);
    setProducts(data.getAllProduct);
  };
  useEffect(() => {
    product();
  }, []);

  return (
    <div className="App">
      <a href="/addProduct">Add Product</a>
      <h1 style={{ color: "red" }}>Here my all Products</h1>
      <table>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Edit</th>
        <th>Delete</th>

        {products.map((item) => (
          <Fragment key={item.id}>
            <tr>
              <td>
                <p>{item.id}</p>
              </td>
              <td>
                <p>{item.name}</p>
              </td>
              <td>
                <p>{item.price}</p>
              </td>
              <td>
                <p>{item.quantity}</p>
              </td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>

            <br />
          </Fragment>
        ))}
      </table>
    </div>
  );
}

// function App() {
//   const [products, setProducts] = useState([]);
//   const id = "62de89a0aa4d2531d789c94c";
//   const query = gql`
//     {
//       getProductById(id:${id}) {
//         name
//         price
//         quantity
//         id
//       }
//     }
//   `;

//   const product = async () => {
//     const data = await request(endpoint, query);
//     setProducts(data.getProductById);
//   };
//   useEffect(() => {
//     product();
//   }, []);
//   console.log("@@@@@@@@@@@@@@@@", products);
//   return (
//     <div className="App">
//       <h1 style={{ color: "red" }}>Here my all Products</h1>
//
//       <>
//         <h3 style={{ color: "blue" }}>{products.id}</h3>
//         <p>{products.name}</p>
//         <p>{products.price}</p>
//         <p>{products.quantity}</p>
//       </>
//
//     </div>
//   );
// }

export default GetAllProduct;
