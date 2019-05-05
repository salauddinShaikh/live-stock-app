import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import StockTable from '../components/stockTable';

it('it should renders the APP component', () => {
    const wrapper = shallow(<App />);
    const elem = <span>Live Stocks App </span>
    expect(wrapper.contains(elem)).toEqual(true);
    expect(wrapper.find(StockTable).length).toEqual(1);
});
it('it should set isSocketError in state', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().onError({})
    expect(wrapper.state().isSocketError).toEqual(true);
});
it('it should check onMessage()', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().onMessage({data:'[["msft",133.0514366829427],["goog",70.35727953984954],["tck",75.05805227235848]]'})
    wrapper.instance().onMessage({data:'[["msft",130.0514366829427]]'})
    wrapper.instance().onMessage({data:'[["msft",139.0514366829427]]'})
    expect(wrapper.state().isSocketError).toEqual(false);
});
