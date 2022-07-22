const { SchemaRepositoryVersion } = require('@s1seven/schema-tools-versioning');
const { readFile } = require('fs/promises');
const { compile } = require('handlebars');
const { defaultServerUrl, translations, htmlTemplatePath, inspectionTemplatePath } = require('./constants');
const { version: pkgVersion } = require('../package.json');

(async function (argv) {
  const certificatePattern = argv[2] || 'test/fixtures/valid_certificate_*.json';
  try {
    const updater = new SchemaRepositoryVersion(defaultServerUrl, [], pkgVersion, translations(), 'schema.json');
    await updater.updateSchemasVersion();
    const inspectionTemplate = await readFile(inspectionTemplatePath, 'utf-8');
    await updater.updateHtmlFixturesVersion(certificatePattern, htmlTemplatePath, {
      partials: { inspection: (ctx, opts) => compile(inspectionTemplate)(ctx, opts) },
    });
  } catch (error) {
    console.error(error.message);
  }
})(process.argv);
