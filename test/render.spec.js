/* eslint-disable no-undef */
const { generateHtml } = require('@s1seven/schema-tools-generate-html');
const { generatePdf } = require('@s1seven/schema-tools-generate-pdf');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { fromBuffer } = require('pdf2pic');

describe('Render', function () {
  const testSuitesMap = [
    {
      certificateName: `valid_certificate_1`,
    },
  ];

  testSuitesMap.forEach(({ certificateName }) => {
    it(`${certificateName} should be rendered as a valid HTML`, async () => {
      const templatePath = resolve(__dirname, '../template.hbs');
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const expectedHTML = readFileSync(resolve(__dirname, `./fixtures/${certificateName}.html`), 'utf-8');
      //
      const html = await generateHtml(certificatePath, {
        templatePath,
        templateType: 'hbs',
      });
      expect(html).toEqual(expectedHTML);
    });

    it(`${certificateName} should be rendered as a valid PDF`, async () => {
      const generatorPath = resolve(__dirname, '../generate-pdf.min.js');
      const certificatePath = resolve(__dirname, `./fixtures/${certificateName}.json`);
      const certificate = JSON.parse(readFileSync(certificatePath, 'utf8'));
      const styles = JSON.parse(readFileSync(resolve(__dirname, '../generate-pdf.styles.json'), 'utf8'));
      const docDefinition = {
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
        styles,
      };
      const options = {
        density: 100,
        width: 600,
        height: 600,
      };
      const expectedPDFBuffer = readFileSync(resolve(__dirname, `./fixtures/${certificateName}.pdf`));
      const expectedPDF = await fromBuffer(expectedPDFBuffer, options)(1, true);
      //
      const buffer = await generatePdf(certificate, {
        docDefinition,
        inputType: 'json',
        outputType: 'buffer',
        generatorPath,
      });
      const result = await fromBuffer(buffer, options)(1, true);
      expect(buffer instanceof Buffer).toEqual(true);
      expect(result.base64).toEqual(expectedPDF.base64);
    }, 10000);
  });
});
