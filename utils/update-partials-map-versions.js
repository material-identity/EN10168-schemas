const { writeFileSync } = require('fs');
const { loadExternalFile } = require('@s1seven/schema-tools-utils');
const { resolve } = require('path');
const { version: pkgVersion } = require(resolve(__dirname, '../package.json'));
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addVToVersionNumber, commitChanges } = require('./helpers');
const { execSync } = require('child_process');

function stageChanges() {
  const schemasPaths = 'partials-map.json';
  execSync(`git add ${schemasPaths}`);
}

function updateUrl(url, property, version) {
  const regex = new RegExp(`${property}/(?:v)((\\d.){2}\\d)`);
  const newVersionNumber = addVToVersionNumber(version);
  return url.replace(regex, `${property}/${newVersionNumber}`);
}

function updateUrlVersions(partialsMap, newInspectionVersion, newDefinitionsVersion) {
  Object.keys(partialsMap).forEach((key) => {
    const url = partialsMap[key];
    if (/en10168-schemas/.test(url)) {
      partialsMap[key] = updateUrl(url, 'en10168-schemas', newInspectionVersion);
    } else if (newDefinitionsVersion && /schema-definitions/.test(url)) {
      partialsMap[key] = updateUrl(url, 'schema-definitions', newDefinitionsVersion);
    }
  });
}

(async function updatePartialsMapVersions() {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 -i v0.3.0 -d v0.0.5 -s [Boolean] -c [Boolean]')
    .options({
      newInspectionVersion: {
        description: 'The new version to update inspection to. Defaults to package.json version number.',
        demandOption: false,
        example: 'v0.3.0',
        default: pkgVersion,
        alias: 'i',
      },
      newDefinitionsVersion: {
        description: 'The new version to update all schema definitions to.',
        demandOption: false,
        example: 'v0.0.5',
        alias: 'd',
      },
      stage: {
        description: 'If true, it will add the affected files to staging.',
        demandOption: false,
        default: false,
        alias: 's',
      },
      commit: {
        description: 'If true, it will commit staged files.',
        demandOption: false,
        default: false,
        alias: 'c',
      },
    }).argv;

  try {
    const { newInspectionVersion, newDefinitionsVersion, stage, commit } = argv;
    const partialsMapFilePath = resolve(__dirname, '../partials-map.json');
    const partialsMap = await loadExternalFile(partialsMapFilePath, 'json');

    updateUrlVersions(partialsMap, newInspectionVersion, newDefinitionsVersion);
    writeFileSync(partialsMapFilePath, JSON.stringify(partialsMap, null, 2));

    if (stage) stageChanges();
    if (commit) commitChanges(`chore: update partials-map version numbers [skip ci]`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
