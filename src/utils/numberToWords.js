/**
 * Convert number to Indonesian words
 * @param {number} num - Number to convert
 * @returns {string} - Number in words (Indonesian)
 */
export const numberToWords = (num) => {
  const ones = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
  const teens = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
  const tens = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];
  const scales = ['', 'ribu', 'juta', 'miliar', 'triliun'];

  if (num === 0) return 'nol';

  let words = '';
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      words = convertChunk(chunk, ones, teens, tens) + (scales[scaleIndex] ? ' ' + scales[scaleIndex] + ' ' : ' ') + words;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim();
};

/**
 * Convert chunk of 3 digits to words
 * @param {number} num - Number chunk (0-999)
 * @param {array} ones - Ones array
 * @param {array} teens - Teens array
 * @param {array} tens - Tens array
 * @returns {string} - Chunk in words
 */
const convertChunk = (num, ones, teens, tens) => {
  let words = '';

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    words += ones[hundreds] + ' ratus ';
  }

  const remainder = num % 100;
  if (remainder >= 10 && remainder < 20) {
    words += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;

    if (ten > 0) {
      words += tens[ten];
      if (one > 0) {
        words += ' ' + ones[one];
      }
    } else if (one > 0) {
      words += ones[one];
    }
  }

  return words.trim();
};

/**
 * Format currency to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount) return '';
  return new Intl.NumberFormat('id-ID').format(amount);
};

/**
 * Format currency with symbol
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string with symbol
 */
export const formatCurrencyWithSymbol = (amount) => {
  if (!amount) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
