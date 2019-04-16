require('dotenv').config();
// Enzyme config
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Alice objects and components
import Carrot from '../server/carrot-input.js';
import BlueBottle from '../server/blueBottle.js';
import FrontPage from '../client/Components/FrontPage.jsx';
import Button from '../client/Components/Button.jsx';
import Main from '../client/Containers/Main.jsx';


let config = {
    host: '192.168.0.236', 
    username: 'test', 
    password: 'test', 
    port: 15672,
    isWeb: true
};
const carrot = new Carrot(config);

// // define `append` as a mocked fn
// const append = jest.fn();
// // set test `Headers`
// global.Headers = () => ({
// headers: append,
// });

const bearer = 'Basic ' + Base64.encode(`${config.username}:${config.password}`);
carrot.options = {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
        Authorization: bearer,
        'Content-Type': 'application/json'
    },
}

xdescribe('Testing the carrot library (User defined URI)', () => {

    test('Host is set correctly', () => {
        expect(carrot.host).toBe(config.host);
    })

    test('fetch from rabbit OVERVIEW (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.overview();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit EXCHANGES (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.exchanges();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit QUEUES (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.queues();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit CONSUMERS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.consumers();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit CHANNELS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.channels();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit BINDINGS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.bindings();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit MOTHERLOAD (async/await)', async () => {
        expect.assertions(1);
        const data = await carrot.motherLoad();
        expect(data).toBeTruthy();
    });
});


describe('Enzyme suite testing', () => {
    it('FrontPage should have a Button rendered', () => {
        const wrapper = shallow(<FrontPage />);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it('Should have a class name of "settings1"', () => {
        const wrapper = shallow(<FrontPage />);
        expect(wrapper.find('.login-box')).toHaveLength(1);
    });
    it('Should have a class name of "container"', () => {
        const wrapper = mount(<FrontPage className="container" />);
        expect(wrapper.props().className).toBe("container");
    });
    it('Should have a hostname property set', () => {
        const wrapper = mount(<Main hostName="192.168.0.236"/>)
        expect(wrapper.props().hostName).toBe('192.168.0.236');
    });

    it('simulates change event on hostname', () => {
        const onChangeTextField = sinon.spy();
        const wrapper = shallow(<FrontPage updateHostname={onChangeTextField} />);
        wrapper.find('#host').simulate('change');
        wrapper.find('#host').simulate('change');
        wrapper.find('#host').simulate('change');
        expect(onChangeTextField).toHaveProperty('callCount', 3);
      });
});

xdescribe('Blue bottle testing', () => {

    const config = {
        host: '192.168.0.236',
        username: 'test',
        password: 'test',
        port: 15672,
        isWeb: true,
    };

    const bb = new BlueBottle(config);
    const bearer = 'Basic ' + Base64.encode(`${config.username}:${config.password}`);
    bb.carrot.options = {
        method: 'GET',
        withCredentials: true,
        credentials: 'included',
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json'
        },
    }

    test('fetch from carrot MOTHERLOAD (async/await)', async () => {
        expect.assertions(1);
        const massagedD3Data = await bb.getData();
        expect(massagedD3Data).toBeTruthy();
    });
});