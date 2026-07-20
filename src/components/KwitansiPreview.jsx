import { forwardRef, useState, useEffect } from "react";
import blangko from "../img/kwitansi-bg.png";
import { numberToWords, formatCurrency } from "../utils/numberToWords";

/**
 * KwitansiPreview Component - Renders the kwitansi (receipt) with print support
 * This component uses forwardRef for react-to-print integration
 * @param {Object} data - Form data
 * @param {boolean} showBg - Whether to show background image (default: true)
 */
const KwitansiPreview = forwardRef(({ data, showBg = true }, ref) => {
  const [bgImage, setBgImage] = useState("");

  // Convert image to base64 for print compatibility
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      setBgImage(canvas.toDataURL("image/png"));
    };
    img.src = blangko;
  }, []);

  return (
    <div
      ref={ref}
      className="w-[210mm] h-[297mm] font-serif box-border text-black bg-white relative p-0 m-0"

    >
      {/* Container untuk konten kwitansi */}
      <div
        className="space-y-1 bg-[size:100%_100%] bg-no-repeat bg-left-top"
        style={{
          backgroundImage: showBg ? (bgImage ? `url(${bgImage})` : `url(${blangko})`) : "none",
        }}
      >
        {/* Nomor Kwitansi */}
        <div className="flex items-end gap-2 mb-2 ml-[155px] pt-[16px]">
          <span className="text-[22px] min-w-[40px] leading-[1.2]">No.</span>
          <div className="text-[20px] leading-[1.2] min-w-[170px] border-b border-solid border-black">
            {data.no || ""}
          </div>
        </div>

        {/* Telah Terima Dari */}
        <div className="flex items-baseline gap-4 ml-[155px] pt-[10px]">
          <span className="text-[16px] w-[136px] shrink-0">Telah terima dari:</span>
          <div className="text-[18px]">{data.terimaDari || ""}</div>
        </div>

        {/* Uang Sejumlah - dengan terbilang */}
        <div className="flex items-start gap-4 ml-[155px]">
          <span
            className="text-[16px] w-[128px] shrink-0"
          >
            Uang sejumlah:
          </span>
          <div className="flex-1 text-[16px] min-h-[40px] capitalize leading-[1.2] py-[8px] px-[8px] border-y border-black text-justify mr-[20px]"
          style={{
            backgroundColor: "rgba(0,0,0,.01)",
                backgroundImage: `
    repeating-linear-gradient(
      to bottom,
      rgba(0,0,0,.18) 0,
      rgba(0,0,0,.18) 1px,
      transparent 1px,
      transparent 6px
    ),
    radial-gradient(
      rgba(0,0,0,.18) 0.6px,
      transparent 0.6px
    )
  `,
                backgroundSize: "100% 3px, 3px 3px",
          }}>
            {data.nominal ? `${numberToWords(data.nominal)} Rupiah` : ""}
          </div>
        </div>

        {/* Untuk Pembayaran */}
        <div className="flex items-start gap-3 ml-[155px]">
          <span
            className="text-[16px] w-[136px] shrink-0"
          >
            Untuk pembayaran:
          </span>
          <div className="flex-1 text-[16px] pl-[4px] leading-[1.2] min-h-[50px] border-b border-solid border-black whitespace-pre-wrap break-words mr-[20px]">
            {data.untukPembayaran || ""}
          </div>
        </div>

        {/* Kota dan Tanggal */}
        <div className="w-fit ml-auto mr-[20px] mt-[16px] mb-[36px] text-[16px] border-b border-black flex">
          <span
            className="capitalize"
            style={{ minWidth: data.kota ? `20px` : `80px` }}
          >
            {data.kota ? data.kota.toLowerCase() : ""}
          </span>
          <span>,&nbsp;</span>
          <span style={{ minWidth: data.kota ? `20px` : `160px` }}>{data.kota ? data.tanggal : ""}</span>
        </div>

        {/* Footer - Nominal */}
        <div className="flex items-start gap-3 ml-[155px] pb-[16px]">
          <div className="flex items-center gap-2">
            <span className="text-[22px]">Rp.</span>
            <div className="text-[22px] text-left min-w-[150px] min-h-[40px] leading-[1.2] py-2 px-3 border-y border-black]"
              style={{
                backgroundColor: "rgba(0,0,0,.01)",
                backgroundImage: `
    repeating-linear-gradient(
      to bottom,
      rgba(0,0,0,.18) 0,
      rgba(0,0,0,.18) 1px,
      transparent 1px,
      transparent 6px
    ),
    radial-gradient(
      rgba(0,0,0,.18) 0.6px,
      transparent 0.6px
    )
  `,
                backgroundSize: "100% 3px, 3px 3px",
                minWidth: data.nominal == 0 ? `150px` : `30px`,
              }}
            >
              {data.nominal ? formatCurrency(data.nominal) : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

KwitansiPreview.displayName = "KwitansiPreview";

export default KwitansiPreview;
