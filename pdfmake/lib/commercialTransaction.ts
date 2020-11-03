import { supplementaryInformation } from './supplementaryInformation';
import { createTransactionParties } from './createTransactionParties';

export function createCommercialTransaction(certificate) {
  const commercialTransaction = certificate.Certificate.CommercialTransaction;

  const commercialParties = createTransactionParties(commercialTransaction)

  const contentToOmit = ['A01', 'A04', 'A06', 'A06.1', 'A06.2', 'A06.3', 'SupplementaryInformation'];
  const content = Object.keys(commercialTransaction).filter(element => !contentToOmit.includes(element)).map(element =>
    [{ text: element, style: 'p', colSpan: 2 }, {}, commercialTransaction[element]]
  );

  const suppInformation = supplementaryInformation(commercialTransaction.SupplementaryInformation);

  return {
    content: [
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*'],
          body: [
            ...commercialParties,
            ...content,
            ...suppInformation
          ]
        },
      },
    ]
  }
}