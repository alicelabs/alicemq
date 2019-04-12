require('dotenv').config();
// Enzyme config
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Alice objects and components
import Carrot from '../server/carrot-input.js';
import BlueBottle from '../server/blueBottle.js';
import SignIn from '../client/Components/SignIn.jsx';


let config = {
    host: '192.168.0.236', // process.env.RABBIT_HOST
    username: 'test', // process.env.RABBIT_USERNAME
    password: 'test', // process.env.RABBIT_PASSWORD
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
    credentials: 'included',
    headers: {
        Authorization: bearer,
        'Content-Type': 'application/json'
    },
}

describe('Testing the carrot library (User defined URI)', () => {

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
    it('Should have a class name of "settings1"', () => {
        const wrapper = shallow(<SignIn visualize="false" />);
        console.log(wrapper);
        expect(wrapper).toEqual("false");
    });
});

describe('Blue bottle testing', () => {

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

