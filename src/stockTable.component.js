import React from 'react'
import TimeAgo from 'timeago-react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

export default function StockTable({ stocks }) {
    return (
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
                                <td style={{ width: "150px" }}>
                                    <TimeAgo
                                        datetime={stocks[item].time}
                                    />
                                </td>
                                <td>
                                    <Sparklines data={stocks[item].priceHistory} width={100} height={20} limit={20}>
                                        <SparklinesLine color="#56b45d" style={{ fill: "#56b45d" }} />
                                    </Sparklines>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}