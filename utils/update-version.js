const { execSync } = require('child_process');
const glob = require('glob');
const fs = require('fs');
const jsdom = require('jsdom');
const prettier = require('prettier');
const { promisify } = require('util');
const { version: pkgVersion } = require('../package.json');

const serverUrl = 'https://schemas.s1seven.com/en10168-schemas';
const schemaFilePaths = ['schema.json'];
const jsonFixturesPattern = 'test/fixtures/*valid_certificate_*.json';
const htmlFixturesPattern = 'test/fixtures/*valid_certificate_*.html';
const { JSDOM } = jsdom;

function readFile(path) {
  return promisify(fs.readFile)(path, 'utf8');
}

function writeFile(path, data) {
  return promisify(fs.writeFile)(path, data);
}

function buildRefSchemaUrl(version, schemaName = 'schema') {
  return `${serverUrl}/${version}/${schemaName}.json`;
}

async function updateJsonFixturesVersion(version) {
  const propertyPath = 'RefSchemaUrl';
  const filePaths = glob.sync(jsonFixturesPattern);
  await Promise.all(
    filePaths.map(async (filePath) => {
      const file = JSON.parse(await readFile(filePath));
      const RefSchemaUrl = buildRefSchemaUrl(version);
      file[propertyPath] = RefSchemaUrl;
      const prettierOptions = await prettier.resolveConfig(filePath);
      const json = prettier.format(JSON.stringify(file, null, 2), { ...(prettierOptions || {}), parser: 'json' });
      await writeFile(filePath, json);
    }),
  );
}

async function updateHTMLFixturesVersion(version) {
  const propertyPath = 'footer p em';
  const filePaths = glob.sync(htmlFixturesPattern);
  await Promise.all(
    filePaths.map(async (filePath) => {
      const file = await readFile(filePath);
      const RefSchemaUrl = buildRefSchemaUrl(version);
      const dom = new JSDOM(file);
      const captions = dom.window.document.querySelectorAll(propertyPath);
      captions[1].textContent = RefSchemaUrl;
      const html = prettier.format(dom.window.document.documentElement.outerHTML, { parser: 'html' });
      await writeFile(filePath, html);
    }),
  );
}

async function updateSchemasVersion(version) {
  await Promise.all(
    schemaFilePaths.map(async (filePath) => {
      const schema = JSON.parse(await readFile(filePath));
      let [schemaName] = filePath.split('.');
      schemaName = schemaName === 'schema' ? schemaName : `${schemaName}.schema`;
      schema.$id = buildRefSchemaUrl(version, schemaName);
      const prettierOptions = await prettier.resolveConfig(filePath);
      const json = prettier.format(JSON.stringify(schema, null, 2), { ...(prettierOptions || {}), parser: 'json' });
      await writeFile(filePath, json);
    }),
  );
}

function stageAndCommitChanges(version) {
  execSync(`git add ${jsonFixturesPattern} ${htmlFixturesPattern} ${schemaFilePaths.join(' ')}`);
  execSync(`git commit -m 'chore: sync versions to ${version}'`);
}

(async function (argv) {
  const version = argv[2] || pkgVersion;
  await updateSchemasVersion(version);
  await updateJsonFixturesVersion(version);
  await updateHTMLFixturesVersion(version);
  stageAndCommitChanges(version);
})(process.argv);
