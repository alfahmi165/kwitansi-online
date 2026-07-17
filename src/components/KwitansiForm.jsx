import React, { useState } from 'react';
import KwitansiPreview from './KwitansiPreview';
import { generateKwitansiPDF } from '../utils/pdfGenerator';
import { generateKwitansiPDFFast } from '../utils/pdfGeneratorConfigurable';

const KwitansiForm = () => {
  const [formData, setFormData] = useState({
    no: '',
    terimaDari: '',
    nominal: '',
    untukPembayaran: '',
    kota: '',
    tanggal: new Date().toISOString().split('T')[0],
  });

  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'nominal') {
      // Remove non-numeric characters except decimal point
      const cleanValue = value.replace(/[^\d]/g, ''); 
      setFormData(prev => ({
        ...prev,
        [name]: cleanValue ? parseInt(cleanValue, 10) : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePrint = async () => {
    // Validate form
    if (!formData.no || !formData.terimaDari || !formData.nominal || !formData.untukPembayaran || !formData.kota || !formData.tanggal) {
      alert('Mohon isi semua field sebelum mencetak');
      return;
    }

    setIsLoading(true);
    try {
      await generateKwitansiPDFFast(formData, 'kwitansi-content');
      // Tampilkan notifikasi sukses
      setTimeout(() => {
        alert('PDF sedang dibuka di tab baru. Jika popup diblokir, cek notifikasi browser Anda.');
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat membuat PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      no: '',
      terimaDari: '',
      nominal: '',
      untukPembayaran: '',
      kota: '',
      tanggal: new Date().toISOString().split('T')[0],
    });
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Aplikasi Kwitansi Online</h1>
          <p className="text-gray-600">Buat dan cetak kwitansi dalam format PDF dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Isi Data Kwitansi</h2>
            
            <form className="space-y-5">
              {/* No Kwitansi */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. Kwitansi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="no"
                  value={formData.no}
                  onChange={handleChange}
                  placeholder="Contoh: BKU1CS123456789000"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Telah Terima Dari */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telah Terima Dari <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="terimaDari"
                  value={formData.terimaDari}
                  onChange={handleChange}
                  placeholder="Nama penerima pembayaran"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Nominal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Uang Sejumlah (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nominal"
                  value={formatCurrency(formData.nominal)}
                  onChange={handleChange}
                  placeholder="Contoh: 99999999"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">Masukkan angka tanpa titik atau koma</p>
              </div>

              {/* Untuk Pembayaran */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Untuk Pembayaran <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="untukPembayaran"
                  value={formData.untukPembayaran}
                  onChange={handleChange}
                  placeholder="Keterangan pembayaran (misal: Biaya Sewa, Biaya Layanan, dll)"
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              {/* Kota */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kota <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  placeholder="Contoh: Bandung"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  {isLoading ? 'Memproses...' : '📥 Cetak PDF'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  🔄 Reset Form
                </button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Tips:</span> Pastikan semua data sudah benar sebelum mencetak. File PDF akan langsung terunduh ke perangkat Anda.
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Preview Kwitansi</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  {showPreview ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showPreview && (
                <div className="bg-gray-100 p-4 overflow-auto max-h-[800px]">
                  <div className="scale-50 origin-top-left">
                    <KwitansiPreview data={formData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KwitansiForm;
