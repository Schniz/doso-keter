import React, { Component } from "react";
import Fetch from "./Fetch";
import ProductList from './ProductsList'

const FetchProducts = ({ render, lastRenderRequest }) =>
  <Fetch
    url={`http://localhost:8080/api/products?lastRenderRequest=${lastRenderRequest}`}
    options={{}}
    render={render}
  />;

class App extends Component {
  state = {credentials:null}

  refreshFn = () => {
    this.setState({ lastRenderRequest: new Date() })
  }

  render() {
    return (
      <div>
        <button>
          Login
        </button>
        <FetchProducts
          lastRenderRequest={this.state.lastRenderRequest}
          render={({ data, error, loading }) =>
              loading
                ? <div>loading</div>
                : error
                ? <pre>
                  error: {error}
                </pre>
                : <ProductList refreshFn={this.refreshFn} products={data} />}
              />
            </div>
    );
  }
}

export default App;
