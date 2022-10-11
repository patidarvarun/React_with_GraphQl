import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
const { request } = require("graphql-request");
const endpoint = `http://localhost:5000/graphql/`;
// import { useQuery } from "@apollo/react-hooks";

const CHECKOUT = gql`
  query Query {
    createCheckoutSession
  }
  #   query Query {
  #     mutation createProduct(

  #     )
  #   }
`;

function CheckoutButton() {
  //   const [startCheckout, { loading, data }] = useLazyQuery(CHECKOUT, {
  //     defaultOptions: {
  //       watchQuery: {
  //         fetchPolicy: "cache-and-network",
  //         notifyOnNetworkStatusChange: true,
  //       },
  //     },
  //     onCompleted: (queryData) => {
  //       console.log("queryData", queryData);
  //       let data = JSON.parse(queryData.createCheckoutSession);
  //       console.log("DAATATA", data);
  //       let checkoutUrl = data.url;
  //       window.location.assign(checkoutUrl);
  //     },
  //   });
  const product = async () => {
    const data = await request(endpoint, CHECKOUT);
    console.log("@@@@@@#$$%", data);
  };

  return (
    <div>
      <Button onClick={product}>Checkout</Button>
    </div>
  );
}

export default CheckoutButton;
