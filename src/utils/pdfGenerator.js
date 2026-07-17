import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generateKwitansiPDF = async (formData, elementId) => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      alert('Elemen untuk di-print tidak ditemukan');
      return;
    }

    // Clone element untuk menghindari perubahan pada DOM asli
    const clonedElement = element.cloneNode(true);
    clonedElement.style.margin = '0';
    clonedElement.style.padding = '0';
    
    // Buat container sementara untuk rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '210mm';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Tunggu images loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Buat canvas dengan scale lebih tinggi untuk kualitas lebih baik
    const canvas = await html2canvas(clonedElement, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowHeight: clonedElement.scrollHeight,
      windowWidth: clonedElement.scrollWidth,
    });

    // Cleanup temp container
    document.body.removeChild(tempContainer);

    // Buat PDF dengan ukuran A4 Portrait
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Jika tinggi melebihi 1 halaman, buat multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height in mm

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    // Generate filename dengan nomor kwitansi dan tanggal
    const filename = `Kwitansi_${formData.no}_${new Date().getTime()}.pdf`;
    
    // Dapatkan PDF sebagai blob
    const pdfBlob = pdf.output('blob');
    
    // Buat object URL dari blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Buka di tab baru
    window.open(pdfUrl, '_blank');
    
    // Juga simpan file (opsional)
    // Uncomment jika ingin download + open
    // pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Gagal membuat PDF: ' + error.message);
  }
};
