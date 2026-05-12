const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
};

export function getCurrencySymbol(code) {
  if (!code) return '₹';
  return CURRENCY_SYMBOLS[String(code).toUpperCase()] || code;
}

export function formatCurrency(amount, currencyCode = 'INR', options = {}) {
  if (amount == null || Number.isNaN(Number(amount))) return '';
  const num = Number(amount);
  const symbol = getCurrencySymbol(currencyCode);
  const decimals = options.decimals !== undefined ? options.decimals : 2;
  const formatted = num.toFixed(decimals);
  if (options.symbolFirst !== false) {
    return `${symbol} ${formatted}`;
  }
  return `${formatted} ${symbol}`;
}
