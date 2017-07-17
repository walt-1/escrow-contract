import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const ETHEREUM_PROVIDER = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const TRANSFER_ABI = [{"constant":false,"inputs":[],"name":"confirmRecieved","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmPurchase","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"refundBuyer","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"datePurchased","type":"uint256"}],"name":"TransferConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"assetPrice","type":"uint256"},{"indexed":false,"name":"dateTransfered","type":"uint256"}],"name":"TransferReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"refundAmount","type":"uint256"},{"indexed":false,"name":"dateRefunded","type":"uint256"}],"name":"Refund","type":"event"}];
const TRANSFER_ADDRESS = '0x5de37645b4b96096782e769daf283346bdc0e564';
const TRANSFER_CONTRACT = ETHEREUM_PROVIDER.eth.contract(TRANSFER_ABI).at(TRANSFER_ADDRESS);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
  }

  render() {

    return (
      <div className="App">
        <h1 className="banner">Smart Escrow</h1>
        <div className="content">
          <div className="section">
            <img src={"http://amplifiii.com/flatso/wp-content/uploads/2013/09/flat-faces-icons-circle-man-4_256x256x32.png"} alt={"seller"} className="traders" />
            <button />
          </div>
          <div className="section">
            <img src={"https://cloudposse.com/wp-content/uploads/sites/29/2016/04/icon-mentors-e1459485567739.png"} alt={"buyer" } className="traders" />
            <img src={"https://cloudposse.com/wp-content/uploads/sites/29/2016/04/icon-mentors-e1459485567739.png"} alt={"buyer" } className="traders" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
