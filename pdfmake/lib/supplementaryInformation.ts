import {CommercialTransactionSupplementaryInformation} from '../types'
import {Translate} from '../utils/translate';

export const supplementaryInformation = (data: CommercialTransactionSupplementaryInformation, i18n: Translate) => {

  const dataMapped = Object.keys(data).map(element => [{ text: data[element].Key, style: 'p', colSpan: 2 }, {}, `${data[element].Value} ${data[element].Unit ? data[element].Unit : ''}`])

  if (dataMapped.length === 0) return []
  return [
    [
      { text: i18n.translate('SupplementaryInformation', 'otherFields'), style: 'h2', colSpan: 3 }, {}, {},
    ],
    ...dataMapped
  ]
}