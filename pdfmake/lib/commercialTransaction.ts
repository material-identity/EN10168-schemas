import { supplementaryInformation } from './supplementaryInformation';
import { createTransactionParties } from './createTransactionParties';
import {Translate} from '../utils/translate';

import {CommercialTransaction} from '../types'

export function createCommercialTransaction(commercialTransaction: CommercialTransaction, i18n: Translate) {

  const commercialParties = createTransactionParties(commercialTransaction, i18n);

  const contentToOmit = ['A01', 'A04', 'A06', 'A06.1', 'A06.2', 'A06.3', 'SupplementaryInformation'];
  const content = Object.keys(commercialTransaction).filter(element => !contentToOmit.includes(element)).map(element =>
    [{ text: i18n.translate(element, 'certificateFields'), style: 'p', colSpan: 2 }, {}, commercialTransaction[element]]
  );

  const suppInformation = supplementaryInformation(commercialTransaction.SupplementaryInformation, i18n);

  return {
    content: [
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*'],
          body: [
            ...commercialParties,
            [{text: i18n.translate('CommercialTransaction', 'certificateGroups'), style: 'h2', colSpan: 3}, {}, {}],
            ...content,
            ...suppInformation
          ]
        },
      },
    ]
  }
}
