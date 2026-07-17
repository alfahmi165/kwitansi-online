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
      }}
    >
      <div
        className="w-full h-auto bg-[length:100%_100%] bg-no-repeat bg-center p-[20px_20px_20px_160px]"
        style={{ backgroundImage: `url(${blangko})` }}>


        {/* Nomor */}
        <div className="flex items-end w-max mb-[20px]">
          <div
            style={{
              width: 40,
              fontSize: 18,
            }}
          >
            No.
          </div>

          {/* Bungkus dengan div inline-block agar border hanya selebar teks di dalamnya */}
          <div className="inline-block border-b border-black">
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.2,
                paddingBottom: 2,
              }}
            >
              {data.no}
            </div>
          </div>
        </div>


        {/* Terima dari */}

        <div className="flex items-end">
          <div
            style={{
              width: 180,
              fontSize: 18,
            }}
          >
            Telah terima dari
          </div>

          <div
            className="flex-1 border-b border-black uppercase"
            style={{
              fontSize: 18,
              paddingBottom: 2,
            }}
          >
            {data.terimaDari}
          </div>
        </div>

        {/* Terbilang */}

        <div className="flex items-end">
          <div className='self-start'
            style={{
              width: 180,
              fontSize: 18,
            }}
          >
            Uang sejumlah
          </div>

          <div
            className="flex-1 border-b border-black pt-1 pl-2 pr-2 pb-1"
            style={{
              fontSize: 16,
              backgroundColor: 'rgba(254, 254, 254, 0.1)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {data.nominal
              ? numberToWords(data.nominal).toUpperCase() + " RUPIAH"
              : ""}
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
      paddingTop: 4,
    }}
  >
    Untuk pembayaran :
  </div>

  {/* Bagian Isi dengan Garis Bawah di Setiap Baris */}
  <div
    className="flex-1 text-justify"
    style={{
      fontSize: 18,
      minHeight: 72, // Menampung sekitar 2-3 baris kosong awal
      lineHeight: "32px", // Menentukan jarak antar baris teks
      whiteSpace: "pre-wrap",
      paddingTop: 4,
      // Membuat pola garis horizontal otomatis di setiap baris
      backgroundImage: "linear-gradient(to bottom, transparent 31px, #000000 31px)",
      backgroundSize: "100% 32px", // Lebar 100%, tinggi harus sama dengan lineHeight
      backgroundRepeat: "repeat",
    }}
  >
    {data.untukPembayaran}
  </div>
</div>


        {/* Footer */}
        {/* {Kota & Tanggal} */}

        <div className="w-full flex justify-end items-center gap-1 mt-5 mb-10">
          <p>{data.kota ? data.kota : ""}</p>
          <p>,</p>
          <p>{data.tanggal ? data.tanggal : ""}</p>
        </div>


        <div className="flex justify-between items-end mt-6">

          {/* Nominal */}

          <div className="flex items-end w-max mb-2">
            <span
              style={{
                fontSize: 22,
                marginRight: 10,
              }}
            >
              Rp.
            </span>

            <div
              className="inline-block pl-2 pr-2 border-b border-t border-black"
              style={{
                textAlign: "left",
                fontSize: 26,
                lineHeight: 1.2,
                backgroundColor: 'rgba(254, 254, 254, 0.1)',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`

              }}
            >
              {data.nominal
                ? new Intl.NumberFormat("id-ID").format(data.nominal)
                : ""}
            </div>
          </div>

        </div>

      </div>
    </div>
  );

};

export default KwitansiPreview;
