/* eslint-disable no-undef */
const { validate } = require('@s1seven/schema-tools-validate');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { readFileSync } = require('fs');
const { resolve } = require('path');

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
      certificatePath: `${__dirname}/fixtures/valid_certificate_1.json`,
    },
  ];

  validCertTestSuitesMap.forEach((testSuite) => {
    it(`${testSuite.certificatePath} should be a valid certificate`, async () => {
      const errors = await validate(testSuite.certificatePath);
      expect(errors).toBeNull();
    });
  });

  // TODO:
  // const invalidCertTestSuitesMap = [];

  // invalidCertTestSuitesMap.forEach((testSuite) => {
  //   it(`${testSuite.certificatePath} should be an invalid certificate`, async () => {
  //     const errors = await validate(testSuite.certificatePath);
  //     expect(JSON.stringify(errors, null, 2)).toBe(testSuite.expectedErrors);
  //   });
  // });
});
