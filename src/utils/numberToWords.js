/**
 * Convert number to Indonesian words
 * For Rupiah (whole numbers only)
 */

const ONES = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

const TEENS = [
  "sepuluh",
  "sebelas",
  "dua belas",
  "tiga belas",
  "empat belas",
  "lima belas",
  "enam belas",
  "tujuh belas",
  "delapan belas",
  "sembilan belas",
];

const TENS = [
  "",
  "",
  "dua puluh",
  "tiga puluh",
  "empat puluh",
  "lima puluh",
  "enam puluh",
  "tujuh puluh",
  "delapan puluh",
  "sembilan puluh",
];

const SCALES = ["", "ribu", "juta", "miliar", "triliun"];

const convertChunk = (num) => {
  let words = "";

  const hundreds = Math.floor(num / 100);

  if (hundreds === 1) {
    words += "seratus ";
  } else if (hundreds > 1) {
    words += `${ONES[hundreds]} ratus `;
  }

  const remainder = num % 100;

  if (remainder >= 10 && remainder <= 19) {
    words += TEENS[remainder - 10];
  } else {
    const tens = Math.floor(remainder / 10);
    const ones = remainder % 10;

    if (tens > 1) {
      words += TENS[tens];

      if (ones > 0) {
        words += ` ${ONES[ones]}`;
      }
    } else if (ones > 0) {
      words += ONES[ones];
    }
  }

  return words.trim();
};

export const numberToWords = (num) => {
  if (!Number.isFinite(num) || !Number.isSafeInteger(num) || num < 0) {
    return null;
  }

  if (num === 0) return "nol";

  let words = "";
  let scaleIndex = 0;

  while (num > 0) {
    if (scaleIndex >= SCALES.length) {
      return null;
    }

    const chunk = num % 1000;

    if (chunk !== 0) {
      let chunkWords;

      if (scaleIndex === 1 && chunk === 1) {
        chunkWords = "seribu";
      } else {
        chunkWords = convertChunk(chunk);

        if (SCALES[scaleIndex]) {
          chunkWords += ` ${SCALES[scaleIndex]}`;
        }
      }

      words = `${chunkWords} ${words}`.trim();
    }

    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words;
};

export const formatCurrency = (amount) => {
  if (!Number.isFinite(amount)) return "";

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCurrencyWithSymbol = (amount) => {
  if (!Number.isFinite(amount)) return "";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
