const BlueBottle = require('../server/blueBottle.js');

const userConfig = {
  host: '192.168.0.35',
  username: 'vhs',
  password: '4444',
  port: '15672',
  isWeb: true
};

let loggingBottle = new BlueBottle(userConfig);
console.log(loggingBottle)

let call = async()=> {
  let data = await loggingBottle.getData();
  await console.log(data);
}

call();