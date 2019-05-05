import React from 'react';
import { shallow } from 'enzyme';
import StockTable from '../components/stockTable';

const stock = { "msft": { "price": "157.42", "color": "white", "time": 1557038422710, "priceHistory": [157.41928474643254] }, "mu": { "price": "33.46", "color": "white", "time": 1557038422710, "priceHistory": [33.4574452599352] } }
it('it should renders the StockTable component', () => {
    const wrapper = shallow(<StockTable stocks={stock} />);
    const elem = <th>Ticker</th>
    expect(wrapper.contains(elem)).toEqual(true);
});