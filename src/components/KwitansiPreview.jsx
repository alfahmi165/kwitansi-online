import React from 'react';
import blangko from '../img/kwitansi-bg.png';

const KwitansiPreview = ({ data }) => {
  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format Tanggal Indonesia
  const formatTanggalIndo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Convert number to words
  const numberToWords = (num) => {
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

  return (
    <div
      id="kwitansi-content"
      className="bg-white mx-auto"
      style={{
        width: "210mm",
        height: "297mm", // ukuran A4
        padding: "0",
        fontFamily: "Times New Roman, serif",
        boxSizing: "border-box",
        color: "#000",
        pageBreakAfter: "avoid", 
        breakAfter: "avoid",
      }}
    >
      <div
        className="w-full h-auto bg-[length:100%_100%] bg-no-repeat bg-center p-[20px_20px_20px_160px]"
        style={{ backgroundImage: `url(${blangko})` }}>


        {/* Nomor */}
        <div className="flex items-baseline w-max mb-[5px]">
          <div
            style={{
              width: 40,
              fontSize: 18,
              lineHeight: 1.2, /* Samakan line-height */
            }}
          >
            No.
          </div>

          <div className="inline-block border-b border-black">
            <div
              style={{
                fontSize: 16,
                lineHeight: 1.2,
                paddingBottom: 8,
              }}
            >
              {data.no}
            </div>
          </div>
        </div>



        {/* Terima dari */}

        <div className="flex items-baseline">
          <div
            style={{
              width: 180,
              fontSize: 18,
              lineHeight: 1.2, /* Ditambahkan agar tinggi baris virtual sama */
            }}
          >
            Telah terima dari:
          </div>

          <div
            className="flex-1 border-b border-black uppercase"
            style={{
              fontSize: 16,
              lineHeight: 1.2, /* Ditambahkan agar tinggi baris virtual sama */
              paddingBottom: 8,
            }}
          >
            {data.terimaDari}
          </div>
        </div>


        {/* Terbilang */}

        <div className="flex">
          <div
            style={{
              width: 180,
              fontSize: 18,
              lineHeight: "10px",
              paddingBottom: 8, /* Samakan padding bawah dengan div sebelah */
            }}
          >
            Uang sejumlah:
          </div>

          <div
            className="flex-1 border-b border-black pt-2 px-2" /* Ganti p-2 menjadi pt-2 px-2, pb-2 dibuang */
            style={{
              fontSize: 16,
              lineHeight: 1.2, /* Tambahkan line-height agar teks stabil */
              paddingBottom: 8, /* Gunakan px konstan agar sejajar dengan teks kiri */
              backgroundColor: 'rgba(254, 254, 254, 0.1)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            <span className="relative -top-[10px]">

              {data.nominal
                ? numberToWords(data.nominal).toUpperCase() + " RUPIAH"
                : ""}
            </span>
          </div>
        </div>


        {/* Untuk pembayaran */}
        <div className="flex items-start w-full">
          {/* Bagian Label Kiri */}
          <div
            className="font-medium"
            style={{
              width: 180,
              fontSize: 18,
              lineHeight: "2px",
            }}
          >
            Untuk pembayaran :
          </div>

          <div
            className="flex-1 text-justify"
            style={{
              fontSize: 16,
              lineHeight: "24px",
              whiteSpace: "pre-wrap",
              // Memberikan padding bottom minimal setengah atau satu tinggi baris (24px)
              paddingBottom: "24px",
              backgroundImage: "linear-gradient(to bottom, transparent 23px, #000000 23px)",
              backgroundSize: "100% 24px",
              backgroundRepeat: "repeat",
            }}
          >
            <span className="relative -top-[10px]">
              {data.untukPembayaran}
            </span>
          </div>
        </div>





        {/* Footer */}
        {/* {Kota & Tanggal} */}

        <div className="w-full flex justify-end items-center gap-1 mt-1 mb-2 text-md">
          <p>{data.kota ? data.kota : ""}</p>
          <p>,</p>
          <p>{data.tanggal ? formatTanggalIndo(data.tanggal) : ""}</p>
        </div>


        <div className="flex justify-between items-end mt-6">

          {/* Nominal */}

          <div className="flex items-end w-max mb-1">
            <span
              style={{
                fontSize: 22,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              Rp.
            </span>

            <div
              className="inline-block pl-2 pr-2 border-b border-t border-black"
              style={{
                textAlign: "left",
                fontSize: 22,
                lineHeight: 1.2,
                backgroundColor: 'rgba(254, 254, 254, 0.1)',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`

              }}
            > <span className="relative -top-[12px]">
                {data.nominal
                  ? new Intl.NumberFormat("id-ID").format(data.nominal)
                  : ""} </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

};

export default KwitansiPreview;
