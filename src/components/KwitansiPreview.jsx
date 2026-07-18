import React, { forwardRef, useState, useEffect } from 'react';
import blangko from '../img/kwitansi-bg.png';
import { numberToWords, formatCurrency } from '../utils/numberToWords';

/**
 * KwitansiPreview Component - Renders the kwitansi (receipt) with print support
 * This component uses forwardRef for react-to-print integration
 * @param {Object} data - Form data
 * @param {boolean} showBg - Whether to show background image (default: true)
 */
const KwitansiPreview = forwardRef(({ data, showBg = true }, ref) => {
  const [bgImage, setBgImage] = useState('');

  // Convert image to base64 for print compatibility
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setBgImage(canvas.toDataURL('image/png'));
    };
    img.src = blangko;
  }, []);

  return (
    <div
      ref={ref}
      className="kwitansi-print"
      style={{
        width: "210mm",
        height: "297mm",
        fontFamily: "'Times New Roman', serif",
        boxSizing: "border-box",
        color: "#000",
        backgroundColor: "#fff",
        position: "relative",
        padding: "0px",
        margin: "0px",

      }}
    >
      {/* Container untuk konten kwitansi */}
      <div className="space-y-1"
        style={{
          backgroundImage: showBg ? (bgImage ? `url(${bgImage})` : `url(${blangko})`) : "none",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          backgroundAttachment: "cover",
        }}>
        {/* Nomor Kwitansi */}
        <div className="flex items-end gap-2 mb-2 ml-[155px] pt-[10px]">
          <span className="text-[18px] min-w-[40px] leading-[1.2]">
            No.
          </span>
          <div className="text-[16px] leading-[1.2] min-w-[150px] border-b border-solid border-black">
            {data.no || ''}
          </div>
        </div>

        {/* Telah Terima Dari */}
        <div className="flex items-baseline gap-4 ml-[155px] pt-[10px]">
          <span style={{ fontSize: '16px', width: '130px', flexShrink: 0 }}>
            Telah terima dari:
          </span>
          <div style={{ fontSize: '16px' }}>
            {data.terimaDari || ''}
          </div>
        </div>

        {/* Uang Sejumlah - dengan terbilang */}
        <div className="flex items-start gap-4 ml-[155px]">
          <span
            style={{
              fontSize: '16px',
              width: '130px',
              flexShrink: 0,
            }}
          >
            Uang sejumlah:
          </span>
          <div
            style={{
              flex: 1,
              fontSize: '16px',
              lineHeight: '1.2',
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '2px',
              paddingRight: '2px',
              borderTopWidth: '1px',
              borderBottomWidth: '1px',
              borderTopStyle: 'solid',
              borderBottomStyle: 'solid',
              borderTopColor: '#000',
              borderBottomColor: '#000',
              backgroundColor: 'rgba(254, 254, 254, 0.5)',
              textAlign: 'justify',
              marginRight: '20px',
            }}
          >
            {data.nominal
              ? `${numberToWords(parseInt(data.nominal))} Rupiah`
              : ''}
          </div>
        </div>

        {/* Untuk Pembayaran */}
        <div className="flex items-start gap-3 ml-[155px]">
          <span
            style={{
              fontSize: '16px',
              width: '130px',
              flexShrink: 0,
            }}
          >
            Untuk pembayaran:
          </span>
          <div className="pt-1 flex-1 text-[16px] leading-[1.2] min-h-[80px] border-b border-solid border-black whitespace-pre-wrap break-words">
            {data.untukPembayaran || ''}
          </div>
        </div>

        {/* Kota dan Tanggal */}
        <div className='w-fit ml-auto mr-[20px] border-b border-black flex'
          style={{ fontSize: '16px' }}
        >
          <span className='capitalize'>
            {data.kota ? data.kota.toLowerCase() : ''}
          </span>
          <span>,&nbsp;</span>
          <span>{data.tanggal || ''}</span>
        </div>


        {/* Footer - Nominal */}
        <div className="flex justify-between items-end mt-8">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '22px' }}>Rp.</span>
            <div
              style={{
                fontSize: '26px',
                lineHeight: '1.2',
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                paddingRight: '12px',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
                borderTopColor: '#000',
                borderBottomColor: '#000',
                backgroundColor: 'rgba(254, 254, 254, 0.5)',
                textAlign: 'left',
                minWidth: '180px',
              }}
            >
              {data.nominal ? formatCurrency(parseInt(data.nominal)) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

KwitansiPreview.displayName = 'KwitansiPreview';

export default KwitansiPreview;