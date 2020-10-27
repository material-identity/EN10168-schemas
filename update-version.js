const fs = require('fs');
const { promisify } = require('util');

const serverUrl = 'https://raw.githubusercontent.com/s1seven/schemas';

function readFile(path) {
  return promisify(fs.readFile)(path, 'utf8');
}

function writeFile(path, data) {
  return promisify(fs.writeFile)(path, data);
}

const schemaFilePaths = [
  'EN10168.schema.json',
  'e-CoC.schema.json',
  'ChemicalAnalysis.schema.json',
];

async function updateSchemasVersion(version) {
  await Promise.all(
    schemaFilePaths.map(async (filePath) => {
      const schema = JSON.parse(await readFile(filePath));
      const [schemaName] = filePath.split('.');
      schema.$id = `${serverUrl}/${version}/${schemaName}.schema.json`;
      await writeFile(filePath, JSON.stringify(schema, null, 2));
    })
  );
}

(async function (argv) {
  const version = argv[2];
  await updateSchemasVersion(version);
})(process.argv);
