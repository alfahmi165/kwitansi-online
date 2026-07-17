import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generateKwitansiPDFAdvanced = async (formData, elementId) => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      alert('Elemen untuk di-print tidak ditemukan');
      return;
    }

    // Tampilkan loading indicator
    const originalDisplay = element.style.display;
    
    // Clone dan setup element untuk rendering yang lebih akurat
    const clone = element.cloneNode(true);
    clone.style.margin = '0';
    clone.style.padding = '0';
    clone.style.transform = 'scale(1)';
    clone.style.width = '210mm';
    clone.style.height = '297mm';
    
    // Buat container sementara dengan styling yang tepat
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.zIndex = '-10000';
    container.style.width = '210mm';
    container.style.height = '297mm';
    container.style.backgroundColor = '#fff';
    container.style.overflow = 'hidden';
    container.appendChild(clone);
    
    document.body.appendChild(container);

    // Tunggu rendering
    await new Promise(resolve => {
      setTimeout(() => {
        // Force reflow
        container.offsetHeight;
        resolve();
      }, 300);
    });

    // Generate canvas dengan kualitas tinggi
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 2000,
      width: 210 * 3.78, // 210mm in pixels (96 dpi)
      height: 297 * 3.78, // 297mm in pixels
      windowHeight: 297 * 3.78,
      windowWidth: 210 * 3.78,
    });

    // Hapus container sementara
    document.body.removeChild(container);

    // Buat PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false, // Tidak compress agar kualitas tetap baik
    });

    // Convert canvas ke image
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions
    const pageWidth = 210;
    const pageHeight = 297;
    
    // Calculate image dimensions
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    // Add image to PDF
    let yPosition = 0;
    pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);

    // If image height exceeds page height, create additional pages
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight - pageHeight;
      yPosition = pageHeight;

      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -yPosition, imgWidth, imgHeight);
        yPosition += pageHeight;
        heightLeft -= pageHeight;
      }
    }

    // Create blob and open in new tab
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Open in new tab
    const newWindow = window.open(pdfUrl, '_blank');
    
    // Fallback untuk browser yang block popup
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      // Jika gagal open tab, download instead
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Kwitansi_${formData.no}_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('PDF berhasil diunduh!');
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF: ' + error.message);
  }
};
