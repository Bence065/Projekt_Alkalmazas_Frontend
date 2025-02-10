export function formatCurrency(value){
    return new Intl.NumberFormat('hu-HU',
         { style: 'currency',
           currency: 'HUF',
           maximumFractionDigits: 0})
           .format(value);
  };