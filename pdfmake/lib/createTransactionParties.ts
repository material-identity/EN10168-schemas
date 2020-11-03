import {CommercialTransaction} from '../types'
import {Translate} from '../utils/translate';

function separateCommercialParties(parties: CommercialTransaction, i18n: Translate) {
  const initKeys = parties['A04'] !== undefined ? [[{ text: i18n.translate('A04', 'certificateFields'), style: 'h3' }]] : [];
  const initValues = parties['A04'] !== undefined ? [[{ image: parties.A04, width: 150 }]] : [];

  const commercialTransactionParties = Object.keys(parties).filter(element => ['A01', 'A06', 'A06.1', 'A06.2', 'A06.3'].includes(element));

  const keys = commercialTransactionParties.map(element => [{ text: i18n.translate(element, 'certificateFields'), style: 'h3' }]);
  const values = commercialTransactionParties.map(element =>
    [{ text: parties[element].CompanyName, style: 'p' }, { text: parties[element].Street, style: 'p' },
    {
      text: `${parties[element].City},${parties[element].ZipCode},${parties[element].Country}`,
      style: 'p'
    }, { text: parties[element].VAT_Id, style: 'p' }, { text: parties[element].Email, style: 'p' }]
  );

  return [[...initKeys, ...keys], [...initValues, ...values]];
}

function splitIfTooLong(arr) {
  if (arr.length < 4) return [arr];
  if (arr.length === 4) return [[arr.slice(0, 3)], [['', ...arr.slice(3, arr.length), '']]];
  return [[arr.slice(0, 3)], [['', ...arr.slice(3, arr.length)]]];
}

export function createTransactionParties(parties: CommercialTransaction, i18n: Translate) {
  const [keys, values] = separateCommercialParties(parties, i18n);
  if (keys.length <= 3) return [keys, values];
  const finalKeys = splitIfTooLong(keys);
  const finalValues = splitIfTooLong(values);
  return [...finalKeys[0], ...finalValues[0], ...finalKeys[1], ...finalValues[1]];

}
