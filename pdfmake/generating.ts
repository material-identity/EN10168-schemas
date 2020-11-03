import { createCommercialTransaction } from './lib/commercialTransaction';

export function Generate(certificate) {

  const commercialTransaction = createCommercialTransaction(certificate);

  return [
    { text: 'Certificate', style: 'h1' },
    ...commercialTransaction.content
  ]
}