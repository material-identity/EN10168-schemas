/* eslint-disable no-undef */
const { loadExternalFile } = require('@s1seven/schema-tools-utils');
const Ajv2019 = require('ajv/dist/2019');
const draft7MetaSchema = require('ajv/dist/refs/json-schema-draft-07.json');
const addFormats = require('ajv-formats');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { languages, translationProperties } = require('../utils/constants');

const createAjvInstance = () => {
  const ajv = new Ajv2019({
    loadSchema: (uri) => loadExternalFile(uri, 'json'),
    strictSchema: true,
    strictNumbers: true,
    strictRequired: true,
    strictTypes: true,
    allErrors: true,
  });
  ajv.addKeyword('meta:license');
  ajv.addMetaSchema(draft7MetaSchema);
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
    {
      certificateName: `valid_certificate_5`,
    },
    {
      certificateName: `valid_certificate_6`,
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
          instancePath: '/Certificate/CommercialTransaction/A97',
          schemaPath: '#/properties/A97/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C71',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/required',
          keyword: 'required',
          params: { missingProperty: 'Symbol' },
          message: "must have required property 'Symbol'",
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C71/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C72/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C73/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C74/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C75/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C76/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C77/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C78/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C79/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C80/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C81/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C82/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C85/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C86/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection/ChemicalComposition/C92/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf/1/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: null },
          message: 'must match exactly one schema in oneOf',
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
          params: { type: 'string' },
          message: 'must be string',
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
          schemaPath: '#/unevaluatedProperties',
          keyword: 'unevaluatedProperties',
          params: { unevaluatedProperty: 'B14' },
          message: 'must NOT have unevaluated properties',
        },
        {
          instancePath: '/Certificate/ProductDescription',
          schemaPath: '#/unevaluatedProperties',
          keyword: 'unevaluatedProperties',
          params: { unevaluatedProperty: 'B99' },
          message: 'must NOT have unevaluated properties',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf/0/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
        {
          instancePath: '/Certificate/Inspection/0/ChemicalComposition/C86/Actual',
          keyword: 'pattern',
          message: 'must match pattern "^(?:[0-9]{1,2}(\\.\\d{1,4})?|100)$"',
          params: {
            pattern: '^(?:[0-9]{1,2}(\\.\\d{1,4})?|100)$',
          },
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/pattern',
        },
        {
          instancePath: '/Certificate/Inspection/0/ChemicalComposition/C92/Actual',
          schemaPath:
            'https://schemas.s1seven.com/schema-definitions/v0.0.7/chemical-element/chemical-element.json#/definitions/ChemicalElement/properties/Actual/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: null },
          message: 'must match exactly one schema in oneOf',
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/allOf/1/anyOf/0/required',
          keyword: 'required',
          params: { missingProperty: 'Z01' },
          message: "must have required property 'Z01'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/allOf/1/anyOf/0/required',
          keyword: 'required',
          params: { missingProperty: 'Z02' },
          message: "must have required property 'Z02'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/allOf/1/anyOf/1/required',
          keyword: 'required',
          params: { missingProperty: 'Z01' },
          message: "must have required property 'Z01'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/allOf/1/anyOf/1/required',
          keyword: 'required',
          params: { missingProperty: 'Z02' },
          message: "must have required property 'Z02'",
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/allOf/1/anyOf',
          keyword: 'anyOf',
          params: {},
          message: 'must match a schema in anyOf',
        },
        {
          instancePath: '/Certificate/Validation',
          schemaPath: '#/unevaluatedProperties',
          keyword: 'unevaluatedProperties',
          params: { unevaluatedProperty: 'SupplementaryInformation' },
          message: 'must NOT have unevaluated properties',
        },
      ],
    },
    {
      certificateName: `invalid_certificate_3`,
      expectedErrors: [
        {
          instancePath: '/Certificate/CommercialTransaction/A01/Identifiers',
          schemaPath: '#/definitions/CompanyIdentifiers/anyOf/0/required',
          keyword: 'required',
          params: { missingProperty: 'VAT' },
          message: "must have required property 'VAT'",
        },
        {
          instancePath: '/Certificate/CommercialTransaction/A01/Identifiers',
          schemaPath: '#/definitions/CompanyIdentifiers/anyOf/1/required',
          keyword: 'required',
          params: { missingProperty: 'DUNS' },
          message: "must have required property 'DUNS'",
        },
        {
          instancePath: '/Certificate/CommercialTransaction/A01/Identifiers',
          schemaPath: '#/definitions/CompanyIdentifiers/anyOf',
          keyword: 'anyOf',
          params: {},
          message: 'must match a schema in anyOf',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf/0/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf/1/minItems',
          keyword: 'minItems',
          params: { limit: 1 },
          message: 'must NOT have fewer than 1 items',
        },
        {
          instancePath: '/Certificate/Inspection',
          schemaPath: '#/properties/Certificate/properties/Inspection/oneOf',
          keyword: 'oneOf',
          params: { passingSchemas: null },
          message: 'must match exactly one schema in oneOf',
        },
      ],
    },
  ];

  it('should validate schema', async () => {
    const validateSchema = await createAjvInstance().compileAsync(localSchema);
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
