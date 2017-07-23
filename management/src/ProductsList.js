import React from "react";

export default class ProductsList extends React.Component {
  removeProduct = id => {
    fetch(`http://localhost:8080/api/products/${encodeURIComponent(id)}`, {
      method: "DELETE"
    })
      .then(() => alert("success"))
      .catch(() => alert("error"))
      .then(() => this.props.refreshFn());
  };

  render() {
    const { products } = this.props;

    return (
      <ul>
        {products.map(product => {
          return (
            <li key={product._id}>
              <button onClick={() => this.removeProduct(product._id)}>
                x
              </button>{" "}
              {product.name}
            </li>
          );
        })}
      </ul>
    );
  }
}
