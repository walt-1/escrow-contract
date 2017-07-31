import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

const ETHEREUM_PROVIDER = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const TRANSFER_ADDRESS = '0x464399906975f1606422f5d607ca8fb1920ba599';
const TRANSFER_ABI = [{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmRecieved","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"asset","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmPurchase","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"refundBuyer","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"datePurchased","type":"uint256"}],"name":"PaymentConfirmed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"assetPrice","type":"uint256"},{"indexed":false,"name":"dateTransfered","type":"uint256"}],"name":"GoodTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"refundAmount","type":"uint256"},{"indexed":false,"name":"dateRefunded","type":"uint256"}],"name":"Refund","type":"event"}]
const TRANSFER_CONTRACT = ETHEREUM_PROVIDER.eth.contract(TRANSFER_ABI).at(TRANSFER_ADDRESS);
const COINBASE = ETHEREUM_PROVIDER.eth.coinbase;
const SELLER = ETHEREUM_PROVIDER.eth.accounts[1];

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      buyerBalance: null,
      sellerBalance: null
    }
  }

  componentDidMount(){
    this.setState({
      buyerBalance: ETHEREUM_PROVIDER.fromWei(ETHEREUM_PROVIDER.eth.getBalance(COINBASE).toString(10)),
      sellerBalance: ETHEREUM_PROVIDER.fromWei(ETHEREUM_PROVIDER.eth.getBalance(SELLER).toString(10))
    })

    this.watchForEvents()
  }

  watchForEvents(){
    TRANSFER_CONTRACT.PaymentConfirmed({ fromBlock: ETHEREUM_PROVIDER.eth.currentBlock, toBlock: 'latest'}).watch((err, res) => {
      if (!err) {

        let buyerAddress = res.args.buyer;
        let timeOfPurchase = res.args.datePurchased.toString(10)
        console.log(buyerAddress, timeOfPurchase);
      }

    })
  }

  _purchase() {
    TRANSFER_CONTRACT.confirmPurchase({to: SELLER, from: COINBASE, gas: 210000}, (err, res) => {
      console.log(err, res);
    })
  }



  render() {

    return (
      <div className="App">
        <h1 className="banner">Smart Escrow</h1>
        <div className="content">

          <div className="section">
            <div className="userHeading">
              <img src={"https://cloudposse.com/wp-content/uploads/sites/29/2016/04/icon-mentors-e1459485567739.png"} alt={"buyer" } className="userImg" />
              <div className="userInfo">
                <h1>buyer</h1>
                <h3>{parseFloat(this.state.buyerBalance).toFixed(2)}</h3>
              </div>
            </div>
          </div>

          <div className="section">

          </div>

          <div className="section">
            <div className="userHeading">
              <img src={"http://amplifiii.com/flatso/wp-content/uploads/2013/09/flat-faces-icons-circle-man-4_256x256x32.png"} alt={"seller"} className="userImg" />
              <div className="userInfo">
                <h1>seller</h1>
                <h3>{parseFloat(this.state.sellerBalance).toFixed(2)}</h3>
              </div>
            </div>
            <img src={"http://www.freeiconspng.com/uploads/3d-printer-interface-symbol-2.png"} alt={"seller"} className="item" />
            <button className="purchaseBtn" onClick={()=>{this._purchase()}}>Purchase</button>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
