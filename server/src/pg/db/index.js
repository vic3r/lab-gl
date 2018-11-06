const express = require('express');
const Ajv = require('ajv')

const schema = require ('./schema');

const api = express();
const ajv = new Ajv({allErrors: true});

api.use(express.json({}));
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

const validate = ajv.compile(schema);

function start (config) {
  api.listen(config.api.port);
}

module.exports = {
  start
};
