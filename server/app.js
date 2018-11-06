const path = require('path');
const config = require('config');
const pg = require('./src/pg');

const appName = process.env.NODE_APP;
process.env.NODE_CONFIG_DIR = path.join(__dirname, appName, 'config');

if(!pg) {
  console.log(`App %s not found` % appName);
}

if(process.env.LAMBDA_MODE === 'true') {
  exports.handler = async (message) => {
    const conn = await pg.load(config);
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
    await pg.handler(data, conn);
  };
} else {
  pg.start(config);
}
