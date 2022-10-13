const { readFileSync } = require('fs');
const { resolve } = require('path');
const { name } = require('../package.json');

const defaultServerUrl = `https://schemas.s1seven.com/${name}`;
const schemaDefinitionsPath = 'schema-definitions';
const defaultSchemaDefinitionsVersion = 'v0.0.6';

const localPartialsMapPaths = {
  filePath: 'partials-map.json',
  properties: [
    {
      path: 'inspection',
      value: 'inspection.hbs',
    },
  ],
};

const htmlTemplatePath = resolve('template.hbs');

const pdfGeneratorPath = resolve('generate-pdf.min.js');
const pdfStylesPath = resolve('generate-pdf.styles.json');
const pdfStyles = () => JSON.parse(readFileSync(pdfStylesPath, 'utf8'));
const pdfFonts = {
  Lato: {
    normal: `node_modules/lato-font/fonts/lato-normal/lato-normal.woff`,
    bold: `node_modules/lato-font/fonts/lato-bold/lato-bold.woff`,
    italics: `node_modules/lato-font/fonts/lato-light-italic/lato-light-italic.woff`,
    light: `node_modules/lato-font/fonts/lato-light/lato-light.woff`,
  },
};

const pdfDocDefinition = () => ({
  pageSize: 'A4',
  pageMargins: [20, 20, 20, 40],
  footer: (currentPage, pageCount) => ({
    text: currentPage.toString() + ' / ' + pageCount,
    style: 'footer',
    alignment: 'center',
  }),
  defaultStyle: {
    font: 'Lato',
    fontSize: 10,
  },
  styles: pdfStyles(),
});

const languages = ['DE', 'EN', 'FR', 'PL'];

const translations = () =>
  languages.reduce((acc, ln) => {
    acc[ln] = JSON.parse(readFileSync(resolve(`${ln}.json`), 'utf-8'));
    return acc;
  }, {});

const translationProperties = {
  certificateFields: [
    'A01',
    'A02',
    'A03',
    'A04',
    'A05',
    'A06',
    'A06.1',
    'A06.2',
    'A06.3',
    'A07',
    'A08',
    'A09',
    'A97',
    'A98',
    'A99',
    'B01',
    'B02',
    'B03',
    'B04',
    'B05',
    'B06',
    'B07',
    'B08',
    'B09',
    'B10',
    'B11',
    'B12',
    'B13',
    'C00',
    'C01',
    'C02',
    'C03',
    'C10',
    'C11',
    'C12',
    'C13',
    'C30',
    'C31',
    'C32',
    'C40',
    'C41',
    'C42',
    'C43',
    'C70',
    'D01',
    'Z01',
    'Z02',
    'Z03',
    'Z04',
    'Z04.NotifiedBody',
    'Z04.DoCYear',
    'Z04.DoCNumber',
  ],
  certificateGroups: ['CommercialTransaction', 'ProductDescription', 'Inspection', 'OtherTests', 'Validation'],
  otherFields: [
    'AdditionalInformation',
    'SupplementaryInformation',
    'TensileTest',
    'HardnessTest',
    'ChemicalComposition',
    'NotchedBarImpactTest',
    'OtherMechanicalTests',
    'NonDestructiveTests',
    'OtherProductTests',
    'ProductNorm',
    'MaterialNorm',
    'MassNorm',
    'SteelDesignation',
    'Form',
    'Tube',
    'QuadraticTube',
    'RectangularTube',
    'Pipe',
    'RectangularPipe',
    'Coil',
    'RoundBar',
    'HexagonalBar',
    'FlatBar',
    'Sheet',
    'Slab',
    'Plate',
    'Strip',
    'Scroll',
    'Validation',
    'Other',
    'Description',
    'Width',
    'Thickness',
    'OuterDiameter',
    'Diameter',
    'WallThickness',
    'Height',
    'SideLength',
    'Unit',
  ],
};

module.exports = {
  defaultSchemaDefinitionsVersion,
  defaultServerUrl,
  htmlTemplatePath,
  languages,
  localPartialsMapPaths,
  pdfDocDefinition,
  pdfGeneratorPath,
  pdfStylesPath,
  pdfStyles,
  pdfFonts,
  schemaDefinitionsPath,
  translationProperties,
  translations,
};
