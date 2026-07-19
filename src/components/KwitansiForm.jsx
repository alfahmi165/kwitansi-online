import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import KwitansiPreview from "./KwitansiPreview";
import { formatCurrency } from "../utils/numberToWords";

const KwitansiForm = () => {
  const [errors, setErrors] = useState({
    nominal: "",
  });

  const [formData, setFormData] = useState({
    no: "",
    terimaDari: "",
    nominal: 0,
    untukPembayaran: "",
    kota: "",
    tanggal: new Date().toISOString().split("T")[0],
  });

  const [showPreview, setShowPreview] = useState(true);
  const [showBackground, setShowBackground] = useState(true);

  // Ref untuk komponen yang akan di-print
  const componentRef = useRef(null);

  // Setup react-to-print hook with enhanced print settings
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Kwitansi_${formData.no}_${new Date().getTime()}`,
    pageStyle: `
    @page {
      size: A4 portrait;
      margin: 0;
      padding: 0;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    .kwitansi-print {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      background-size: 100% 100% !important;
      background-repeat: no-repeat !important;
      background-position: 0 0 !important;
      box-shadow: none !important;
    }
  `,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nominal") {
      const cleanValue = value.replace(/[^\d]/g, "");

      if (!cleanValue) {
        setFormData((prev) => ({
          ...prev,
          nominal: 0,
        }));

        setErrors((prev) => ({
          ...prev,
          nominal: "",
        }));

        return;
      }

      const amount = Number(cleanValue);

      if (!Number.isSafeInteger(amount)) {
        setErrors((prev) => ({
          ...prev,
          nominal: "Nominal terlalu besar.",
        }));

        return;
      }

      setErrors((prev) => ({
        ...prev,
        nominal: "",
      }));

      setFormData((prev) => ({
        ...prev,
        nominal: amount,
      }));

      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrintClick = () => {
    // Validate form
    if (
      !formData.no ||
      !formData.terimaDari ||
      formData.nominal <= 0 ||
      !formData.untukPembayaran ||
      !formData.kota ||
      !formData.tanggal
    ) {
      alert("Mohon isi semua field sebelum mencetak");
      return;
    }

    // Trigger print
    handlePrint();
  };

  const handleReset = () => {
    setFormData({
      no: "",
      terimaDari: "",
      nominal: 0,
      untukPembayaran: "",
      kota: "",
      tanggal: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">Aplikasi Kwitansi Online</h1>
          <p className="text-gray-600">Buat dan cetak kwitansi dalam format PDF dengan presisi tinggi</p>
          <p className="mt-2 text-sm text-green-600">
            ✅ Menggunakan React to Print - Rendering PDF lebih presisi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="no-print rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Isi Data Kwitansi</h2>

            <form className="space-y-5">
              {/* No Kwitansi */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  No. Kwitansi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="no"
                  value={formData.no}
                  onChange={handleChange}
                  placeholder="Contoh: BKU1CS123456789000"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Telah Terima Dari */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Telah Terima Dari <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="terimaDari"
                  value={formData.terimaDari}
                  onChange={handleChange}
                  placeholder="Nama penerima pembayaran"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Nominal */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Uang Sejumlah (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nominal"
                  value={formatCurrency(formData.nominal)}
                  onChange={handleChange}
                  placeholder="Contoh: 99999999"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
                {errors.nominal ? (
                  <p className="mt-1 text-sm text-red-500">{errors.nominal}</p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">Masukkan angka tanpa titik atau koma</p>
                )}
              </div>

              {/* Untuk Pembayaran */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Untuk Pembayaran <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="untukPembayaran"
                  value={formData.untukPembayaran}
                  onChange={handleChange}
                  placeholder="Keterangan pembayaran (misal: Biaya Sewa, Biaya Layanan, dll)"
                  rows="3"
                  className="w-full resize-none rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Kota */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Kota <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  placeholder="Contoh: Bandung"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Tanggal */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 transition focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={handlePrintClick}
                  className="active:scale-95 flex-1 transform rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105 hover:bg-blue-700 disabled:bg-gray-400"
                >
                  🖨️ Cetak PDF
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="active:scale-95 flex-1 transform rounded-lg bg-gray-400 px-6 py-3 font-bold text-white transition hover:scale-105 hover:bg-gray-500"
                >
                  🔄 Reset Form
                </button>
              </div>
            </form>

            {/* Info Box - Print Settings */}
            <div className="mt-8 rounded border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="mb-2 text-sm text-gray-700">
                <span className="font-semibold">🖨️ Print Settings untuk Background Gambar:</span>
              </p>
              <ul className="ml-4 space-y-1 text-xs text-gray-600">
                <li>✓ Chrome: Print → Lebih settings → Centang "Background graphics"</li>
                <li>✓ Firefox: Print → Print to File → Centang "Print backgrounds"</li>
                <li>✓ Safari: Print → Centang "Print backgrounds"</li>
              </ul>
            </div>

            {/* Info Box */}
            <div className="mt-4 rounded border-l-4 border-blue-500 bg-blue-50 p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Tips:</span> Pastikan semua data sudah benar sebelum
                mencetak. Gunakan Chrome untuk hasil terbaik.
              </p>
            </div>

            {/* Info Box - React to Print */}
            <div className="mt-4 rounded border-l-4 border-green-500 bg-green-50 p-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">✨ Fitur:</span> React to Print dengan CSS print optimization
                untuk background image support.
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="no-print sticky top-8">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
                <h3 className="text-lg font-bold">Preview Kwitansi</h3>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="rounded bg-gray-700 px-3 py-1 text-sm transition hover:bg-gray-600"
                >
                  {showPreview ? "🙈 Hide" : "👁️ Show"}
                </button>
              </div>

              {showPreview && (
                <div className="h-auto overflow-hidden bg-gray-200 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="bgToggle"
                      checked={showBackground}
                      onChange={(e) => setShowBackground(e.target.checked)}
                      className="cursor-pointer"
                    />
                    <label htmlFor="bgToggle" className="cursor-pointer text-xs text-gray-600">
                      Tampilkan background template
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-[210mm] origin-top scale-[0.45] md:scale-[0.75]">
                      <KwitansiPreview data={formData} showBg={showBackground} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Component */}
      <div className="fixed left-[-9999px] top-0">
        <KwitansiPreview ref={componentRef} data={formData} showBg={showBackground} />
      </div>
    </div>
  );
};

export default KwitansiForm;
