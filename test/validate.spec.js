/* eslint-disable no-undef */
const { loadExternalFile } = require('@s1seven/schema-tools-utils');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const createAjvInstance = () => {
  const ajv = new Ajv({
    loadSchema: (uri) => loadExternalFile(uri, 'json'),
    strictSchema: true,
    strictNumbers: true,
    strictRequired: true,
    strictTypes: true,
    allErrors: true,
  });
  ajv.addKeyword('meta:license');
  addFormats(ajv);
  return ajv;
};

describe('Validate', function () {
  const schemaPath = resolve(__dirname, '../schema.json');
  const localSchema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  const validCertTestSuitesMap = [
    {
      certificateName: `valid_certificate_1`,
    },
    {
      certificateName: `valid_certificate_2`,
    },
    {
      certificateName: `valid_certificate_3`,
    },
    {
      certificateName: `valid_certificate_4`,
    },
  ];
  const invalidCertTestSuitesMap = [
    {
      certificateName: `invalid_certificate_1`,
      expectedErrors: [
        {
          instancePath: '/Certificate',
          schemaPath: '#/properties/Certificate/required',
          keyword: 'required',
          params: { missingProperty: 'CertificateLanguages' },
          message: "must have required property 'CertificateLanguages'",
        },
        {
          instancePath: '/Certificate/CommercialTransaction/A01',
          schemaPath: '#/definitions/Company/required',
          keyword: 'required',
          params: { missingProperty: 'VAT_Id' },
          message: "must have required property 'VAT_Id'",
        },
        {
          instancePath: '/Certificate/ProductDescription',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'B10' },
          message: "must have required property 'B10'",
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C71',
          schemaPath: '#/definitions/ChemicalElement/required',
          keyword: 'required',
          params: { missingProperty: 'Symbol' },
          message: "must have required property 'Symbol'",
        },
      ],
    },
    {
      certificateName: `invalid_certificate_2`,
      expectedErrors: [
        {
          instancePath: '/Certificate/CommercialTransaction/A97',
          schemaPath: '#/properties/A97/type',
          keyword: 'type',
          params: { type: 'number' },
          message: 'must be number',
        },
        {
          instancePath: '/Certificate/CommercialTransaction/A98',
          schemaPath: '#/properties/A98/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/CommercialTransaction/A99',
          schemaPath: '#/properties/A99/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/ProductDescription',
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: 'B14' },
          message: 'must NOT have additional properties',
        },
        {
          instancePath: '/Certificate/ProductDescription',
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: 'B99' },
          message: 'must NOT have additional properties',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'C00' },
          message: "must have required property 'C00'",
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C71/Actual',
          schemaPath: '#/definitions/ChemicalElement/properties/Actual/maximum',
          keyword: 'maximum',
          params: { comparison: '<=', limit: 100 },
          message: 'must be <= 100',
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'Z01' },
          message: "must have required property 'Z01'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'Z02' },
          message: "must have required property 'Z02'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: 'Z04' },
          message: "must have required property 'Z04'",
        },
      ],
    },
  ];

  const languages = ['DE', 'EN', 'FR', 'PL'];
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
      'Validation',
      'Other',
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

  it('should validate schema', () => {
    const validateSchema = createAjvInstance().compile(localSchema);
    expect(() => validateSchema()).not.toThrow();
  });

  validCertTestSuitesMap.forEach(({ certificateName }) => {
    it(`${certificateName} should be a valid certificate`, async () => {
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const certificate = JSON.parse(readFileSync(certificatePath, 'utf8'));
      const validator = await createAjvInstance().compileAsync(localSchema);
      //
      const isValid = await validator(certificate);
      expect(isValid).toBe(true);
      expect(validator.errors).toBeNull();
    });
  });

  invalidCertTestSuitesMap.forEach(({ certificateName, expectedErrors }) => {
    it(`${certificateName} should be an invalid certificate`, async () => {
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const certificate = JSON.parse(readFileSync(certificatePath, 'utf8'));
      const validator = await createAjvInstance().compileAsync(localSchema);
      //
      const isValid = await validator(certificate);
      expect(isValid).toBe(false);
      expect(validator.errors).toEqual(expectedErrors);
    });
  });

  languages.forEach((language) => {
    it(`${language} translations should contain all required properties`, () => {
      const translationsPath = resolve(__dirname, `../${language}.json`);
      const translations = JSON.parse(readFileSync(translationsPath, 'utf8'));
      const certificateFieldsProperties = Object.keys(translations.certificateFields);
      const certificateGroupsProperties = Object.keys(translations.certificateGroups);
      const otherFieldsProperties = Object.keys(translations.otherFields);
      //
      expect(certificateFieldsProperties).toEqual(translationProperties.certificateFields);
      expect(certificateGroupsProperties).toEqual(translationProperties.certificateGroups);
      expect(otherFieldsProperties).toEqual(translationProperties.otherFields);
    });
  });
});
