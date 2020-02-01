// load .env file
const fs = require("fs");
const dotenv = require("dotenv");
const dotenvfile = __dirname + "/../.env";

if (!fs.existsSync(dotenvfile)) {
  throw new Error(`${dotenvfile} not found`);
}
dotenv.config({ path: dotenvfile });

const { Client } = require("zenaton");

const app_id = process.env.ZENATON_APP_ID;
if (!app_id) {
  throw new Error(
    "Please add your Zenaton application id on '.env' file (https://app.zenaton.com/api)"
  );
}

const api_token = process.env.ZENATON_API_TOKEN;
if (!api_token) {
  throw new Error(
    "Please add your Zenaton api token on '.env' file (https://app.zenaton.com/api)"
  );
}

const app_env = process.env.ZENATON_APP_ENV;
if (!app_env) {
  throw new Error(
    "Please add your Zenaton environment on '.env' file (https://app.zenaton.com/api)"
  );
}

// init Zenaton client
module.exports = new Client(app_id, api_token, app_env);
