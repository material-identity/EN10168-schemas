export const supplementaryInformation = (data) => {

  const dataMapped = Object.keys(data).map(element => [{ text: data[element].Key, style: 'p', colSpan: 2 }, {}, `${data[element].Value} ${data[element].Unit ? data[element].Unit : ''}`])

  if (dataMapped.length === 0) return []
  return [
    [
      { text: 'Ergänzende Angaben / Informacje dodatkowe', style: 'h2', colSpan: 3 }, {}, {},
    ],
    ...dataMapped
  ]
}