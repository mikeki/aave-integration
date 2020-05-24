import React, { Component, createRef } from "react";
import Web3 from "web3";
import "./App.css";
import {
  TOKEN_SETS_DECOMPOSER_ABI,
  TOKEN_SETS_DECOMPOSER_ADDRESS,
} from "./config";

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3("http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      components: "",
      units: "",
      prices: "",
      setPrice: "",
    };
  }

  convertPrice = (price) => {
    return price / 10 ** 18;
  };

  decomposeSet = async (e) => {
    const address = this.refs.addressInput.value;

    const web3 = new Web3("http://localhost:8545");
    const tokenSetsComposer = new web3.eth.Contract(
      TOKEN_SETS_DECOMPOSER_ABI,
      TOKEN_SETS_DECOMPOSER_ADDRESS
    );

    const {
      components,
      units,
      prices,
      setPrice,
    } = await tokenSetsComposer.methods.decomposeAndPriceSet(address).call();

    console.log(components);
    console.log(units);
    console.log(prices);
    console.log(setPrice);

    this.setState({
      components: components,
      units: units,
      prices: prices,
      setPrice: this.convertPrice(setPrice),
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Hello, World!</h1>
        <p>Your account: {this.state.account}</p>
        <input type="text" ref="addressInput" />
        <button onClick={this.decomposeSet}>Get</button>
        <div>Component: {this.state.components}</div>
        <div>Units: {this.state.units}</div>
        <div>Price: {this.state.prices}</div>
        <div>Set price: {this.state.setPrice} ETH</div>
      </div>
    );
  }
}

export default App;