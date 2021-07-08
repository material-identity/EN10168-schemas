const { readFileSync } = require('fs');
const { resolve } = require('path');

const getRefSchemaUrl = () => {
  const schemaPath = resolve(__dirname, '../schema.json');
  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  return schema.$id;
};

module.exports = {
  getRefSchemaUrl,
};
