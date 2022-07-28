const { SchemaRepositoryVersion } = require('@s1seven/schema-tools-versioning');
const { execSync } = require('child_process');
const { readFile } = require('fs/promises');
const { compile } = require('handlebars');

const { version: pkgVersion } = require('../package.json');
const {
  defaultServerUrl,
  htmlTemplatePath,
  inspectionTemplatePath,
  pdfDocDefinition,
  pdfFonts,
  pdfGeneratorPath,
  translations,
} = require('./constants');

const schemaFilePaths = [{ filePath: 'schema.json', properties: [{ path: '$id', value: 'schema.json' }] }];
const fixturesFolder = 'test/fixtures';
const jsonFixturesPattern = `${fixturesFolder}/*valid_certificate_*.json`;
const htmlFixturesPattern = `${fixturesFolder}/*valid_certificate_*.html`;
const pdfFixturesPattern = `${fixturesFolder}/valid_certificate_*.pdf`;
const validCertificateFixturesPattern = `${fixturesFolder}/valid_certificate_*.json`;

// async function updateHTMLFixturesVersion(version) {
// const filePaths = glob.sync(htmlFixturesPattern);
// const propertyPath = 'footer p em';
// await Promise.all(
//   filePaths.map(async (filePath) => {
//     const file = await readFile(filePath);
//     const RefSchemaUrl = buildRefSchemaUrl(version);
//     const dom = new JSDOM(file);
//     const captions = dom.window.document.querySelectorAll(propertyPath);
//     captions[1].textContent = RefSchemaUrl;
//     const html = prettier.format(dom.window.document.documentElement.outerHTML, { parser: 'html' });
//     await writeFile(filePath, html);
//   }),
// );
// }

function stageAndCommitChanges(version) {
  const schemasPaths = schemaFilePaths.map(({ filePath }) => filePath).join(' ');
  execSync(`git add ${jsonFixturesPattern} ${htmlFixturesPattern} ${pdfFixturesPattern} ${schemasPaths}`);
  execSync(`git commit -m 'chore: sync versions to ${version}'`);
}

(async function (argv) {
  const version = argv[2] || `v${pkgVersion}`;
  const updater = new SchemaRepositoryVersion(
    defaultServerUrl,
    schemaFilePaths,
    version,
    translations(),
    'schema.json',
  );
  await updater.updateSchemasVersion();
  await updater.updateJsonFixturesVersion(jsonFixturesPattern);
  const inspectionTemplate = await readFile(inspectionTemplatePath, 'utf-8');
  await updater.updateHtmlFixturesVersion(validCertificateFixturesPattern, htmlTemplatePath, {
    partials: { inspection: (ctx, opts) => compile(inspectionTemplate)(ctx, opts) },
  });
  await updater.updatePdfFixturesVersion(
    validCertificateFixturesPattern,
    pdfGeneratorPath,
    pdfDocDefinition(),
    pdfFonts,
  );

  stageAndCommitChanges(version);
})(process.argv);
