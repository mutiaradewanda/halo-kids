import React from 'react';
import { CheckCircle2, Landmark } from 'lucide-react';

/**
 * Komponen Visualisasi Dokumen Realistis dengan Bounding Box AI
 * Mendukung zoom, rotasi, dan overlay deteksi OCR
 */
export default function DocumentCanvasPreview({
  previewType = 'ktp',
  scale = 1,
  rotation = 0,
  showBoundingBoxes = true,
  documentData
}) {
  const isKtp = previewType === 'ktp';
  const isKk = previewType === 'kk';
  const isNikah = previewType === 'nikah';
  const isTransferValid = previewType === 'transfer_valid';
  const isTransferBuram = previewType === 'transfer_buram';

  const ext = documentData?.hasil_ekstraksi_ai || {};

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        userSelect: 'none'
      }}
      className="relative shadow-2xl rounded-xl overflow-hidden"
    >
      {/* -------------------- 1. DOKUMEN SCAN KTP COTA -------------------- */}
      {isKtp && (
        <div className="w-[500px] h-[316px] bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-700 text-white p-5 rounded-2xl relative border-2 border-cyan-300/40 shadow-inner overflow-hidden font-mono select-none">
          {/* Watermark Garuda & Republic of Indonesia */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 border-8 border-white rounded-full flex items-center justify-center font-bold text-6xl">
              RI
            </div>
          </div>

          {/* Header KTP */}
          <div className="text-center pb-2 border-b border-cyan-300/30">
            <h4 className="text-xs font-black tracking-widest text-cyan-100 uppercase">
              PROVINSI JAWA BARAT
            </h4>
            <h5 className="text-[11px] font-bold tracking-wider text-white uppercase">
              KABUPATEN BOGOR
            </h5>
          </div>

          {/* Content Body */}
          <div className="mt-3 flex justify-between gap-3 text-[10px]">
            <div className="space-y-1 flex-1">
              {/* NIK Bounding Box */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-yellow-300">NIK</span>
                <span className="text-xs">:</span>
                <div className={`relative px-1.5 py-0.5 rounded font-black tracking-wider text-xs text-yellow-200 ${
                  showBoundingBoxes ? 'ring-2 ring-emerald-400 bg-emerald-950/60' : ''
                }`}>
                  {ext.nik || '3201011805900003'}
                  {showBoundingBoxes && (
                    <span className="absolute -top-3.5 right-0 bg-emerald-600 text-white text-[8px] px-1 rounded font-sans font-bold">
                      OCR 99.8%
                    </span>
                  )}
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-0.5 text-white/95 text-[9.5px]">
                <div className="flex">
                  <span className="w-24">Nama</span>
                  <span className="w-2">:</span>
                  <span className={`font-bold ${showBoundingBoxes ? 'bg-emerald-950/40 ring-1 ring-emerald-400/80 px-1 rounded' : ''}`}>
                    {ext.nama_lengkap || 'HENDRA PRATAMA'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24">Tempat/Tgl Lahir</span>
                  <span className="w-2">:</span>
                  <span className={showBoundingBoxes ? 'bg-emerald-950/40 ring-1 ring-emerald-400/80 px-1 rounded' : ''}>
                    {ext.tempat_lahir || 'BOGOR'}, {ext.tanggal_lahir || '18-05-1990'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24">Jenis Kelamin</span>
                  <span className="w-2">:</span>
                  <span>{ext.jenis_kelamin || 'LAKI-LAKI'}</span>
                  <span className="ml-4">Gol. Darah: {ext.golongan_darah || 'O'}</span>
                </div>
                <div className="flex">
                  <span className="w-24">Alamat</span>
                  <span className="w-2">:</span>
                  <span>{ext.alamat || 'JL. PAJAJARAN NO. 45'}</span>
                </div>
                <div className="flex pl-6">
                  <span className="w-20">RT/RW</span>
                  <span className="w-2">:</span>
                  <span>002/005</span>
                </div>
                <div className="flex pl-6">
                  <span className="w-20">Kel/Desa</span>
                  <span className="w-2">:</span>
                  <span>{ext.kelurahan_desa || 'BARANANGSIANG'}</span>
                </div>
                <div className="flex pl-6">
                  <span className="w-20">Kecamatan</span>
                  <span className="w-2">:</span>
                  <span>{ext.kecamatan || 'BOGOR TIMUR'}</span>
                </div>
                <div className="flex">
                  <span className="w-24">Agama</span>
                  <span className="w-2">:</span>
                  <span>{ext.agama || 'ISLAM'}</span>
                </div>
                <div className="flex">
                  <span className="w-24">Status Perkawinan</span>
                  <span className="w-2">:</span>
                  <span className={`font-semibold ${showBoundingBoxes ? 'bg-emerald-950/40 ring-1 ring-emerald-400/80 px-1 rounded' : ''}`}>
                    {ext.status_perkawinan || 'KAWIN'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-24">Pekerjaan</span>
                  <span className="w-2">:</span>
                  <span>{ext.pekerjaan || 'KARYAWAN SWASTA'}</span>
                </div>
                <div className="flex">
                  <span className="w-24">Kewarganegaraan</span>
                  <span className="w-2">:</span>
                  <span>{ext.kewarganegaraan || 'WNI'}</span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Foto & Tanda Tangan */}
            <div className="flex flex-col items-center justify-between w-28 shrink-0">
              <div className="w-24 h-28 bg-blue-950 border-2 border-cyan-200/80 rounded-md overflow-hidden flex flex-col items-center justify-center relative shadow">
                {/* Mock Foto KTP */}
                <div className="w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-800 rounded-t-full flex items-center justify-center mt-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300" />
                </div>
                <span className="text-[7px] text-cyan-200 mt-1 uppercase font-mono">PAS FOTO RESMI</span>
              </div>

              <div className="text-center mt-1">
                <span className="text-[8px] text-cyan-200 block">KABUPATEN BOGOR</span>
                <span className="text-[8px] font-mono block">18-05-2015</span>
                <div className="h-4 w-20 border-b border-dashed border-cyan-200/60 mx-auto flex items-center justify-center">
                  <span className="font-serif italic text-[10px] text-cyan-100">Hendra P.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 2. DOKUMEN SCAN KARTU KELUARGA (KK) COTA -------------------- */}
      {isKk && (
        <div className="w-[520px] bg-white text-slate-900 p-5 rounded-xl border-4 border-slate-300 shadow-2xl relative font-sans select-none text-[10px]">
          {/* Header Kartu Keluarga */}
          <div className="text-center pb-2 border-b-2 border-slate-900">
            <h3 className="text-sm font-black tracking-widest uppercase text-slate-950">
              KARTU KELUARGA
            </h3>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <span className="font-bold text-slate-600">No.</span>
              <div className={`px-2 py-0.5 rounded font-mono font-bold tracking-wider text-xs ${
                showBoundingBoxes ? 'ring-2 ring-emerald-500 bg-emerald-50 text-emerald-950' : 'text-slate-900'
              }`}>
                {ext.nomor_kk || '3201012904190005'}
              </div>
            </div>
          </div>

          {/* Metadata KK: Kepala Keluarga & Alamat */}
          <div className="grid grid-cols-2 gap-3 my-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-[9px] text-slate-500 font-semibold block">Nama Kepala Keluarga:</span>
              <div className={`font-bold font-mono text-xs ${
                showBoundingBoxes ? 'ring-1 ring-emerald-400 bg-emerald-100/60 px-1 rounded' : ''
              }`}>
                {ext.kepala_keluarga || 'HENDRA PRATAMA'}
              </div>
              <span className="text-[9px] text-slate-500 font-semibold block mt-1">Alamat:</span>
              <span className="font-semibold text-slate-700">{ext.alamat_kk || 'Jl. Pajajaran No. 45 RT 02/05'}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-500 font-semibold block">Desa/Kelurahan:</span>
              <span className="font-bold text-slate-800">BARANANGSIANG</span>
              <span className="text-[9px] text-slate-500 font-semibold block mt-1">Kecamatan / Kab:</span>
              <span className="font-bold text-slate-800">BOGOR TIMUR / KAB. BOGOR</span>
            </div>
          </div>

          {/* Tabel Anggota Keluarga */}
          <div className="border border-slate-300 rounded overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-200 text-[8px] font-bold p-1 text-slate-700 uppercase">
              <div className="col-span-1 text-center">No</div>
              <div className="col-span-4">Nama Lengkap</div>
              <div className="col-span-4">NIK</div>
              <div className="col-span-3">Status Hubungan</div>
            </div>
            <div className="divide-y divide-slate-200 bg-white">
              <div className="grid grid-cols-12 p-1.5 items-center">
                <div className="col-span-1 text-center font-bold">1</div>
                <div className={`col-span-4 font-bold text-slate-900 ${showBoundingBoxes ? 'ring-1 ring-emerald-400 bg-emerald-50 px-1 rounded' : ''}`}>
                  {ext.kepala_keluarga || 'HENDRA PRATAMA'}
                </div>
                <div className="col-span-4 font-mono font-bold text-slate-800 text-[9px]">
                  {ext.nik_kepala_keluarga || '3201011805900003'}
                </div>
                <div className="col-span-3 text-slate-600 font-semibold">KEPALA KELUARGA</div>
              </div>
              <div className="grid grid-cols-12 p-1.5 items-center">
                <div className="col-span-1 text-center font-bold">2</div>
                <div className={`col-span-4 font-bold text-slate-900 ${showBoundingBoxes ? 'ring-1 ring-emerald-400 bg-emerald-50 px-1 rounded' : ''}`}>
                  {ext.nama_istri || 'SISKA AMELIA'}
                </div>
                <div className="col-span-4 font-mono font-bold text-slate-800 text-[9px]">
                  {ext.nik_istri || '3201014508920002'}
                </div>
                <div className="col-span-3 text-slate-600 font-semibold">ISTRI</div>
              </div>
            </div>
          </div>

          {/* Footer Pengesahan */}
          <div className="mt-2.5 pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-600">
            <div>
              <span>Dikeluarkan: <strong>14-04-2019</strong></span>
              <span className="block text-[8px] text-slate-400">DISDUKCAPIL KABUPATEN BOGOR</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-bold">
              <CheckCircle2 size={12} className="text-emerald-600" />
              <span>TERVERIFIKASI SISTEM SIAK DUKCAPIL</span>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 3. DOKUMEN AKTA / BUKU NIKAH COTA -------------------- */}
      {isNikah && (
        <div className="w-[490px] h-[340px] bg-amber-50 text-amber-950 p-5 rounded-xl border-4 border-amber-700/80 shadow-inner relative font-serif select-none">
          {/* Border Pattern Ornamen Kemenag */}
          <div className="absolute inset-1.5 border border-dashed border-amber-600/40 pointer-events-none" />

          {/* Header */}
          <div className="text-center pb-2 border-b-2 border-amber-800/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Landmark size={18} className="text-amber-800" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                KEMENTERIAN AGAMA REPUBLIK INDONESIA
              </span>
            </div>
            <h4 className="text-sm font-black tracking-wider text-amber-950">
              DUPLIKAT KUTIPAN AKTA NIKAH
            </h4>
            <div className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              showBoundingBoxes ? 'ring-2 ring-emerald-500 bg-emerald-100 text-emerald-900' : 'text-amber-800'
            }`}>
              No. Akta: {ext.nomor_akta_nikah || '421/18/X/2018'}
            </div>
          </div>

          {/* Isi Dokumen Nikah */}
          <div className="mt-3 text-[11px] space-y-2 leading-relaxed">
            <p className="text-center italic text-[10px] text-amber-900/80">
              Menerangkan bahwa telah berlangsung akad pernikahan sah menurut Hukum Islam:
            </p>

            <div className="grid grid-cols-2 gap-3 bg-amber-100/60 p-2.5 rounded-lg border border-amber-300/60">
              {/* Kolom Suami */}
              <div className="space-y-1">
                <span className="font-bold text-[10px] text-amber-900 block border-b border-amber-300 pb-0.5">
                  SUAMI (COTA):
                </span>
                <div className={`relative font-sans text-xs font-bold p-1 rounded ${
                  showBoundingBoxes ? 'ring-2 ring-amber-500 bg-amber-200/80 text-amber-950' : ''
                }`}>
                  {ext.nama_suami || 'HENDRO PRATAMA'}
                  {showBoundingBoxes && (
                    <span className="absolute -top-3 right-0 bg-amber-600 text-white text-[8px] px-1 rounded font-sans font-bold">
                      OCR 76% (Typo?)
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-amber-800">
                  Status: Perjaka • WNI
                </div>
              </div>

              {/* Kolom Istri */}
              <div className="space-y-1">
                <span className="font-bold text-[10px] text-amber-900 block border-b border-amber-300 pb-0.5">
                  ISTRI (COTA):
                </span>
                <div className={`font-sans text-xs font-bold p-1 rounded ${
                  showBoundingBoxes ? 'ring-1 ring-emerald-400 bg-emerald-50 text-emerald-900' : ''
                }`}>
                  {ext.nama_istri || 'SISKA AMELIA'}
                </div>
                <div className="text-[10px] text-amber-800">
                  Status: Perawan • WNI
                </div>
              </div>
            </div>

            {/* Tanggal & Tempat Akad */}
            <div className="flex justify-between items-center bg-white/70 p-2 rounded border border-amber-200 text-[10px]">
              <div>
                <span className="font-bold text-amber-900">Tanggal Akad: </span>
                <span className={`font-bold font-sans ${showBoundingBoxes ? 'ring-1 ring-emerald-500 px-1 rounded bg-emerald-50' : ''}`}>
                  {ext.tanggal_nikah || '12 Oktober 2018'}
                </span>
                <span className="text-emerald-700 font-semibold ml-2">(8 Tahun Menikah)</span>
              </div>
              <div className="text-right">
                <span className="text-amber-800">{ext.kua_penerbit || 'KUA Kec. Bogor Timur'}</span>
              </div>
            </div>

            {/* Stempel & Legalisir */}
            <div className="flex justify-between items-end pt-2">
              <div className="w-16 h-16 rounded-full border-2 border-red-600 text-red-600 flex flex-col items-center justify-center text-[7px] font-bold rotate-[-12deg] opacity-80">
                <span>LEGALISIR</span>
                <span className="text-[6px]">KEMENAG</span>
                <span>KAB. BOGOR</span>
              </div>
              <div className="text-center text-[9px] text-amber-900">
                <span>Kepala KUA Kecamatan</span>
                <div className="h-5 flex items-center justify-center font-serif italic text-amber-950 font-bold">
                  Drs. H. Mulyadi, M.Ag
                </div>
                <span className="text-[8px] text-amber-700">NIP. 197405122002121001</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 3. BUKTI TRANSFER DONASI VALID (BSI MOBILE) -------------------- */}
      {isTransferValid && (
        <div className="w-[420px] bg-slate-50 text-slate-800 p-5 rounded-2xl border border-slate-200 shadow-xl relative font-sans select-none">
          {/* Header BSI */}
          <div className="flex items-center justify-between border-b pb-3 border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-sm">
                BSI
              </div>
              <div>
                <h4 className="text-xs font-bold text-teal-800">Bank Syariah Indonesia</h4>
                <p className="text-[9px] text-slate-500">Resi Transaksi Elektronik</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 size={12} /> BERHASIL
            </div>
          </div>

          {/* Amount Box */}
          <div className="text-center my-4 py-3 bg-teal-50/70 rounded-xl border border-teal-100">
            <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider block">
              Total Donasi Ditransfer
            </span>
            <div className={`inline-block my-1 px-3 py-1 rounded-lg text-lg font-black text-teal-900 ${
              showBoundingBoxes ? 'ring-2 ring-emerald-500 bg-emerald-100' : ''
            }`}>
              {ext.nominal_terformat || 'Rp 2.500.000'}
            </div>
            <span className="text-[9px] text-slate-500 block">Bebas Biaya Admin (Sosial)</span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-[10.5px]">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Penerima</span>
              <span className="font-bold text-slate-800 text-right">
                {ext.nama_penerima || 'KAS SOSIAL ANAK BOGOR (DINSOS)'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Rekening Tujuan</span>
              <span className={`font-mono font-bold ${
                showBoundingBoxes ? 'ring-1 ring-emerald-400 px-1 rounded bg-emerald-50' : ''
              }`}>
                {ext.nomor_rekening_tujuan || '7118-2024-9988-01'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Pengirim Donasi</span>
              <span className="font-semibold text-slate-700">
                {ext.nama_pengirim || 'MUHAMMAD RIZKY PRATAMA'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Waktu & Tanggal</span>
              <span className="font-mono text-slate-700">
                {ext.tanggal_transaksi || '09-10-2026'} • {ext.waktu_transaksi || '07:38:12 WIB'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nomor Referensi</span>
              <span className="font-mono text-[9px] text-slate-600">
                {ext.nomor_referensi || 'BSI-REF-9928192083'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Berita / Catatan</span>
              <span className="font-medium text-slate-700 text-right max-w-[200px] truncate">
                {ext.berita_transfer || 'Donasi Nutrisi Balita Panti'}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-dashed border-slate-300 text-center text-[9px] text-slate-400">
            HaloKids Smart Social Ledger • Sistem Dinsos Terakreditasi
          </div>
        </div>
      )}

      {/* -------------------- 4. BUKTI TRANSFER BURAM / STRUK ATM LOW CONFIDENCE -------------------- */}
      {isTransferBuram && (
        <div className="w-[360px] bg-amber-50/70 text-slate-700 p-4 rounded-xl border border-amber-300 shadow-md relative font-mono text-[10px] select-none filter contrast-75 brightness-95">
          {/* Visual Blur Effect Overlay */}
          <div className="absolute inset-0 bg-amber-200/20 backdrop-blur-[0.7px] pointer-events-none rounded-xl" />

          {/* Struk ATM Content */}
          <div className="text-center border-b border-dashed border-slate-400 pb-2 mb-2">
            <h5 className="font-bold text-slate-800">STRUK TRANSAKSI ATM BNI</h5>
            <p className="text-[8px] text-slate-500">KCP CIBINONG SQUARE • KAB. BOGOR</p>
          </div>

          <div className="space-y-1.5 leading-tight">
            <div className="flex justify-between">
              <span>TANGGAL: 09/10/2026</span>
              <span>JAM: 05:50 WIB</span>
            </div>
            <div className="flex justify-between">
              <span>NO. KARTU: 5214-****-****-9102</span>
            </div>
            <div className="flex justify-between">
              <span>REK. TUJUAN: 7118-2024-****</span>
            </div>
            <div className="flex justify-between">
              <span>PENERIMA: KAS SOSIAL ANAK</span>
            </div>

            <div className="my-2 p-1.5 bg-yellow-100/80 border border-yellow-400 rounded relative">
              <div className="flex justify-between font-bold text-slate-900">
                <span>JUMLAH TRF:</span>
                <span className="text-red-700 blur-[0.6px]">
                  {ext.nominal_terformat || 'Rp 500.00? (BURAM)'}
                </span>
              </div>
              {showBoundingBoxes && (
                <div className="mt-1 text-[8px] bg-amber-600 text-white px-1 py-0.5 rounded font-sans font-bold flex items-center justify-between">
                  <span>OCR Confidence: 62.1% (Low)</span>
                  <span>Teks Terpotong</span>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <span>NO. REF: BNI-98421***</span>
            </div>
            <div className="text-center pt-2 text-[8px] text-slate-400 border-t border-dashed border-slate-300">
              SIMPAN STRUK INI SEBAGAI BUKTI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
