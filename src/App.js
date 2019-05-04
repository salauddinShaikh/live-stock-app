import React, { Component } from 'react';
import TimeAgo from 'timeago-react';
import './App.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';
var websocket;

class App extends Component {
  constructor() {
    super()
    this.state = {
      stocks: {}
    }
  }
  componentWillMount() {
    this.testWebSocket();
  }
  testWebSocket = () => {
    websocket = new WebSocket('ws://stocks.mnet.website');
    websocket.onopen = (evt) => { this.onOpen(evt) };
    websocket.onclose = (evt) => { this.onClose(evt) };
    websocket.onmessage = (evt) => { this.onMessage(evt) };
    websocket.onerror = (evt) => { this.onError(evt) };
  }
  onError = (evt) => {
    console.log('errr' + evt.data);
  }

  onOpen = (evt) => {
    console.log("WebSocket rocks");
  }

  onClose = (evt) => {
    console.log("DISCONNECTED");
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
    this.setState({ stocks })
  }
  render() {
    const { stocks } = this.state
    return (
      <React.Fragment>
        <div className="topnav">
          <span>Live Stocks App </span>
        </div>
        <div className="containers">
          <div >
            <table className="tables">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>Last Update</th>
                  <th>Price Graph</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(stocks).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.toUpperCase()}</td>
                        <td style={{ backgroundColor: stocks[item].color }}>{stocks[item].price}</td>
                        <td>
                          <TimeAgo
                            datetime={stocks[item].time}
                          />
                        </td>
                        <td>
                          <Sparklines data={stocks[item].priceHistory} width={100} height={20}  limit={20}>
                            <SparklinesLine color="#56b45d" style={{ fill: "#56b45d" }} />
                          </Sparklines>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
