require('dotenv').config();
// Enzyme config
import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// Alice objects and components
import Carrot from '../server/carrot-input.js';
import Settings1 from '../client/Components/Settings1.jsx';



describe('Testing the carrot library (Hardcoded URI)', () => {
    const carrots = require('../server/carrots.js');

    test('fetch from rabbit OVERVIEW (promises)', () => {
        return carrots.overview()
                .then(data => {
                    expect(data).toBeTruthy();
                });
    });

    test('fetch from rabbit OVERVIEW (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.overview();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit EXCHANGES (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.exchanges();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit QUEUES (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.queues();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit CONSUMERS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.consumers();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit CHANNELS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.channels();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit BINDINGS (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.bindings();
        expect(data).toBeTruthy();
    });

    test('fetch from rabbit MOTHERLOAD (async/await)', async () => {
        expect.assertions(1);
        const data = await carrots.motherLoad();
        expect(data).toBeTruthy();
    });
});

describe('Testing the carrot library (User defined URI)', () => {
    const config = {
        host: process.env.RABBIT_HOST, 
        username: process.env.RABBIT_USERNAME, 
        password: process.env.RABBIT_PASSWORD
    }; 
    const carrot = new Carrot(config);

    test('Host is set correctly', () => {
        expect(carrot.host).toBe('dinosaur.rmq.cloudamqp.com/api');
    })
    test('URI is set correctly', () => {
        expect(carrot.uri).toBe(process.env.CLOUD_RABBIT_API_URI);
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
        expect(shallow(<Settings1 />).is('.settings1')).toBe(true);
    });
});

