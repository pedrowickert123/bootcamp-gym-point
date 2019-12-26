// export const { format: formatBrPrice } = new Intl.NumberFormat('pt-BR', {
//   style: 'currency',
//   currency: 'BRL',
// });

export const formatBrPrice = (value, prefix = true) => {
  let numberFormatted;

  if (prefix) {
    numberFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  } else {
    numberFormatted = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
    }).format(value);
  }

  return numberFormatted;
};

export const { format: formatUsPrice } = value => {
  if (!value) return value;

  value = value.replace(/\./g, ',');
  const index = value.lastIndexOf(',');

  const first = `${value.substr(0, index).replace(/\,/g, '')}`; // eslint-disable-line
  const decimal = `${value.substr(index).replace(',', '.')}`;

  const currency = Number(`${first}${decimal}`);

  // console.log('Currency: ', currency);

  return new Intl.NumberFormat('en-US').format(currency);
};

export const formatCurrency = value => {
  if (!value) return value;
  value = value.replace(/\./g, ',');
  const index = value.lastIndexOf(',');
  const first = `${value.substr(0, index).replace(/,/g, '')}`;
  const decimal = `${value.substr(index).replace(',', '.')}`;
  const currency = Number(`${first}${decimal}`);

  return currency;
};
