import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { getPDFConfig, mergePDFConfig } from './pdfConfig';

/**
 * Generate Kwitansi PDF dengan konfigurasi yang dapat disesuaikan
 * @param {object} formData - Data kwitansi
 * @param {string} elementId - ID element HTML yang akan di-render
 * @param {string|object} configOrPreset - Nama preset atau custom config object
 * @returns {Promise<void>}
 */
export const generateKwitansiPDFConfigurable = async (
  formData,
  elementId,
  configOrPreset = 'balanced'
) => {
  try {
    // Get configuration
    const config = typeof configOrPreset === 'string'
      ? getPDFConfig(configOrPreset)
      : mergePDFConfig(configOrPreset);

    const element = document.getElementById(elementId);

    if (!element) {
      alert('Elemen untuk di-print tidak ditemukan');
      return;
    }

    // Show loading state (opsional, bisa implement dengan toast notification)
    console.log('📄 Generating PDF with preset:', configOrPreset);

    // Clone element untuk menghindari perubahan pada DOM asli
    const clonedElement = element.cloneNode(true);
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '0';

    // Remove scale transform jika diperlukan
    if (config.clone.removeScaling) {
      clonedElement.style.transform = 'scale(1)';
    }

    // Buat container sementara untuk rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = `${config.page.width}mm`;
    tempContainer.style.backgroundColor = config.canvas.backgroundColor;
    tempContainer.style.overflow = 'hidden';
    tempContainer.appendChild(clonedElement);

    document.body.appendChild(tempContainer);

    // Wait untuk element rendering
    await new Promise(resolve =>
      setTimeout(resolve, config.timing.preRenderDelay)
    );

    // Tunggu images loading
    await new Promise(resolve =>
      setTimeout(resolve, config.timing.imageLoadWait)
    );

    // Buat canvas
    const canvas = await html2canvas(clonedElement, {
      scale: config.canvas.scale,
      useCORS: config.canvas.useCORS,
      allowTaint: config.canvas.allowTaint,
      backgroundColor: config.canvas.backgroundColor,
      logging: config.canvas.logging,
      imageTimeout: config.canvas.imageTimeout,
      windowHeight: clonedElement.scrollHeight,
      windowWidth: clonedElement.scrollWidth,
    });

    // Cleanup temp container
    document.body.removeChild(tempContainer);

    // Buat PDF
    const pdf = new jsPDF({
      orientation: config.pdf.orientation,
      unit: config.pdf.unit,
      format: config.pdf.format,
      compress: config.pdf.compress,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = config.page.width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image dengan support untuk multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= config.page.height;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= config.page.height;
    }

    // Generate filename
    const filename = `Kwitansi_${formData.no}_${new Date().getTime()}.pdf`;

    // Get PDF as blob
    const pdfBlob = pdf.output('blob');

    // Create object URL
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open atau download tergantung setting
    if (config.fallback.downloadIfPopupBlocked) {
      const newWindow = window.open(pdfUrl, config.popup.target);

      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback ke download
        downloadPDF(pdfUrl, filename);

        if (config.fallback.showNotification) {
          alert(
            '⚠️ Popup diblokir oleh browser.\nPDF sedang diunduh...\n\nUntuk membuka di tab baru, izinkan popup di settings browser.'
          );
        }
      } else if (config.fallback.showNotification) {
        alert('✅ PDF sedang dibuka di tab baru');
      }
    } else {
      // Just open in new tab
      window.open(pdfUrl, config.popup.target);
    }

    console.log('✅ PDF generated successfully:', filename);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    alert(`Gagal membuat PDF:\n${error.message}`);
  }
};

/**
 * Helper function untuk download PDF
 * @param {string} pdfUrl - Object URL dari PDF blob
 * @param {string} filename - Nama file
 */
function downloadPDF(pdfUrl, filename) {
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup object URL setelah delay
  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 100);
}

/**
 * Convenience exports untuk preset-specific generators
 */

export const generateKwitansiPDFHighQuality = (formData, elementId) =>
  generateKwitansiPDFConfigurable(formData, elementId, 'highQuality');

export const generateKwitansiPDFBalanced = (formData, elementId) =>
  generateKwitansiPDFConfigurable(formData, elementId, 'balanced');

export const generateKwitansiPDFFast = (formData, elementId) =>
  generateKwitansiPDFConfigurable(formData, elementId, 'fast');

export const generateKwitansiPDFLight = (formData, elementId) =>
  generateKwitansiPDFConfigurable(formData, elementId, 'light');
