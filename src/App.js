import React, { Component } from 'react';
import StockTable from './components/stockTable';
import './App.css';

let websocket;
class App extends Component {
  constructor() {
    super()
    this.state = {
      stocks: {},
      isSocketError:false
    }
  }
  componentWillMount() {
    this.openWebSocket();
  }
  openWebSocket = () => {
    websocket = new WebSocket('ws://stocks.mnet.website');
    websocket.onmessage = (evt) => { this.onMessage(evt) };
    websocket.onerror = (evt) => { this.onError(evt) };
  }
  onError = (evt) => {
    this.setState({isSocketError:true});
    console.log('errr' + evt);
  }
  onMessage = ({ data }) => {
    let { stocks } = this.state;
    let stk = JSON.parse(data)
    stk.forEach(element => {
      let color = '';
      let priceHistory = [];
      if (stocks[element[0]]) {
        color = element[1] - stocks[element[0]].price > 0 ? 'green' : 'red';
        stocks[element[0]].priceHistory.push(element[1]);
        priceHistory = stocks[element[0]].priceHistory;
      } else {
        color = 'white';
        priceHistory = [element[1]];
      }
      stocks[element[0]] = { price: parseFloat(element[1]).toFixed(2), color, time: Date.now(), priceHistory }
    });
    this.setState({ stocks,isSocketError:false })
  }
  render() {
    const { stocks,isSocketError } = this.state
    return (
      <React.Fragment>
        <div className="topnav">
          <span>Live Stocks App </span>
        </div>
        <div className="container">
        {isSocketError && <h2 className="socket-error">Can't connect to server,try after some time</h2>}
        {!isSocketError && <StockTable stocks={stocks}/>}
        </div>
      </React.Fragment>
    )
  }
}

export default App;
