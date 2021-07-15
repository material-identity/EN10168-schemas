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
  ];

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
});
