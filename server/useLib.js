const carrots = require('./carrots.js');

async function main() {
    // --- PROMISE ---
    // carrots.overview()
    // .then(data => {
    //     // stuff
    // });

    // --- ASYNC/AWAIT ---
    const data = await carrots.overview()
    console.log(data.cluster_name);

    // const data = await carrots.exchanges();
    // console.log(data);
    // console.log('EXCHANGES');
}

main();
