import { createCommercialTransaction } from './lib/commercialTransaction';
import { Translate } from './utils/translate'
import {Certificate} from './types';

export function Generate(certificate: Certificate, i18n: Translate) {
  const commercialTransaction = createCommercialTransaction(certificate.Certificate.CommercialTransaction, i18n);

  return [
    { text: 'Certificate', style: 'h1' },
    ...commercialTransaction.content
  ]
}
