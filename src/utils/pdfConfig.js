/**
 * PDF Configuration untuk Kwitansi Generator
 * Sesuaikan nilai-nilai di bawah untuk optimize performa dan kualitas
 */

export const PDF_CONFIG = {
  // Html2Canvas Settings
  canvas: {
    scale: 5, // 1-5: Kualitas rendering (lebih tinggi = lebih baik tapi lebih lambat)
    useCORS: true, // Gunakan CORS untuk external images
    allowTaint: true, // Allow images yang tidak memiliki CORS
    backgroundColor: '#ffffff',
    logging: false, // Set true untuk debug
    imageTimeout: 2000, // Timeout untuk loading images (ms)
  },

  // Element Cloning Settings
  clone: {
    removeScaling: true, // Remove transform scale dari clone
    preserveAspectRatio: true, // Maintain aspect ratio saat cloning
  },

  // Timing Settings
  timing: {
    preRenderDelay: 300, // Delay sebelum rendering canvas (ms)
    imageLoadWait: 500, // Delay untuk loading images (ms)
  },

  // PDF Settings
  pdf: {
    orientation: 'portrait', // 'portrait' atau 'landscape'
    unit: 'mm',
    format: 'a4', // a4 = 210x297 mm
    compress: true, // Kompres PDF untuk ukuran lebih kecil
  },

  // Page Dimensions (mm)
  page: {
    width: 210, // A4 width
    height: 297, // A4 height
  },

  // Popup Settings
  popup: {
    target: '_blank', // '_blank' untuk new tab, '_self' untuk same window
    windowName: 'KwitansiPDF',
  },

  // Fallback Settings
  fallback: {
    downloadIfPopupBlocked: true, // Download jika popup diblokir
    showNotification: true, // Tampilkan notifikasi popup blocked
  },
};

/**
 * Preset Configurations untuk berbagai use cases
 */

export const PDF_PRESETS = {
  // High Quality - untuk printing
  highQuality: {
    ...PDF_CONFIG,
    canvas: { ...PDF_CONFIG.canvas, scale: 4 },
    pdf: { ...PDF_CONFIG.pdf, compress: false },
  },

  // Balanced - rekomendasi untuk general use
  balanced: {
    ...PDF_CONFIG,
    canvas: { ...PDF_CONFIG.canvas, scale: 3 },
    pdf: { ...PDF_CONFIG.pdf, compress: true },
  },

  // Fast - untuk performa quick
  fast: {
    ...PDF_CONFIG,
    canvas: { ...PDF_CONFIG.canvas, scale: 2 },
    pdf: { ...PDF_CONFIG.pdf, compress: true },
  },

  // Light - untuk device dengan RAM terbatas
  light: {
    ...PDF_CONFIG,
    canvas: { ...PDF_CONFIG.canvas, scale: 1 },
    pdf: { ...PDF_CONFIG.pdf, compress: true },
    timing: { ...PDF_CONFIG.timing, preRenderDelay: 200, imageLoadWait: 300 },
  },
};

/**
 * Utility function untuk mendapatkan config berdasarkan preset
 * @param {string} presetName - 'highQuality', 'balanced', 'fast', 'light'
 * @returns {object} PDF Configuration
 */
export const getPDFConfig = (presetName = 'balanced') => {
  return PDF_PRESETS[presetName] || PDF_PRESETS.balanced;
};

/**
 * Utility function untuk merge custom config dengan default
 * @param {object} customConfig - Custom configuration overrides
 * @returns {object} Merged configuration
 */
export const mergePDFConfig = (customConfig) => {
  return {
    ...PDF_CONFIG,
    canvas: { ...PDF_CONFIG.canvas, ...customConfig.canvas },
    pdf: { ...PDF_CONFIG.pdf, ...customConfig.pdf },
    timing: { ...PDF_CONFIG.timing, ...customConfig.timing },
  };
};
