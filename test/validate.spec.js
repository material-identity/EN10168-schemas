/* eslint-disable no-undef */
const { validate } = require('@s1seven/schema-tools-validate');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getRefSchemaUrl } = require('./helpers');

describe('Validate', function () {
  it('should validate schema', () => {
    const schemaPath = resolve(__dirname, '../schema.json');
    const schemaToValidate = JSON.parse(readFileSync(schemaPath, 'utf-8'));
    const ajv = new Ajv({ strict: false, allErrors: true });
    addFormats(ajv);
    //
    const validateSchema = ajv.compile(schemaToValidate);
    expect(() => validateSchema()).not.toThrow();
  });

  const validCertTestSuitesMap = [
    {
      certificateName: `valid_certificate_1`,
    },
  ];

  validCertTestSuitesMap.forEach(({ certificateName }) => {
    it(`${certificateName} should be a valid certificate`, async () => {
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const certificate = JSON.parse(readFileSync(certificatePath, 'utf8'));
      certificate.RefSchemaUrl = getRefSchemaUrl();
      //
      const errors = await validate(certificate);
      expect(errors).toBeNull();
    });
  });

  const invalidCertTestSuitesMap = [
    {
      certificateName: `invalid_certificate_1`,
      expectedErrors: {
        'v0.0.3': [
          {
            root: 'v0.0.3',
            path: 'schema.json/Certificate',
            keyword: 'required',
            schemaPath: '#/properties/Certificate/required',
            expected: "must have required property 'CertificateLanguages'",
          },
          {
            root: 'v0.0.3',
            path: 'schema.json/Certificate/ProductDescription',
            keyword: 'required',
            schemaPath: '#/required',
            expected: "must have required property 'B10'",
          },
          {
            root: 'v0.0.3',
            path: 'schema.json/Certificate/Inspection/ChemicalComposition/C71',
            keyword: 'required',
            schemaPath: '#/definitions/ChemicalElement/required',
            expected: "must have required property 'Symbol'",
          },
        ],
      },
    },
  ];

  invalidCertTestSuitesMap.forEach(({ certificateName, expectedErrors }) => {
    it(`${certificateName} should be an invalid certificate`, async () => {
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const certificate = JSON.parse(readFileSync(certificatePath, 'utf8'));
      certificate.RefSchemaUrl = getRefSchemaUrl();
      //
      const errors = await validate(certificate);
      expect(errors).toEqual(expectedErrors);
    });
  });
});
