const { execSync } = require('child_process');
const { get, set } = require('lodash');
const prettier = require('prettier');
const { localPartialsMapPaths } = require('./constants');

const { loadExternalFile, writeFile } = require('@s1seven/schema-tools-utils');

function stageChanges(filePath) {
  execSync(`git add ${filePath}`);
  console.log('The updated definitions have been staged');
}

(async function () {
  try {
    const { filePath, properties } = localPartialsMapPaths;
    const partialsMap = await loadExternalFile(filePath, 'json', false);

    let partialsMapHasChanged = false;
    for (const { value, path } of properties) {
      if (get(partialsMap, path, undefined)) {
        set(partialsMap, path, value);
        partialsMapHasChanged = true;
      }
    }
    if (partialsMapHasChanged) {
      const prettierOptions = await prettier.resolveConfig(filePath);
      const newPartialsMap = prettier.format(JSON.stringify(partialsMap, null, 2), {
        ...(prettierOptions || {}),
        parser: 'json',
      });
      await writeFile(filePath, newPartialsMap);
    }
    stageChanges(localPartialsMapPaths.filePath);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
