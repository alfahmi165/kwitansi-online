import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generateKwitansiPDF = async (formData, elementId) => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      alert('Elemen untuk di-print tidak ditemukan');
      return;
    }

    // Buat canvas dari elemen
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Buat PDF dengan ukuran A4 Portrait
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Generate filename dengan nomor kwitansi dan tanggal
    const filename = `Kwitansi_${formData.no}_${new Date().getTime()}.pdf`;
    
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF: ' + error.message);
  }
};
