/**
 * Mock Data Respon Backend Single-Agent AI HaloKids (Dinas Sosial)
 * Format JSON terstandarisasi untuk modul ekstraksi OCR/NLP dan Verifikasi Dokumen
 */

export const MOCK_AI_DOCUMENTS = [
  {
    id: 'DOC-COTA-KTP-001',
    tipe_dokumen: 'ktp_cota',
    kategori: 'COTA (Calon Orang Tua Angkat)',
    nama_dokumen: 'KTP_Suami_Hendra_Pratama.jpg',
    ukuran_file: '1.8 MB',
    tanggal_unggah: '09 Okt 2026, 08:15 WIB',
    status: 'diverifikasi', // 'diverifikasi' | 'menunggu_tinjauan_manual' | 'ditolak'
    skor_confidence: 98.6, // Dalam persen (%)
    catatan_ai: 'Kualitas citra sangat baik. Seluruh field NIK, Nama, dan Tanggal Lahir terekstraksi dengan confidence di atas 95%. Lolos syarat batas usia COTA (>= 30 thn).',
    preview_type: 'ktp',
    
    // Data hasil ekstraksi Single-Agent AI (OCR/NLP)
    hasil_ekstraksi_ai: {
      nik: '3201011805900003',
      nama_lengkap: 'HENDRA PRATAMA',
      tempat_lahir: 'BOGOR',
      tanggal_lahir: '18-05-1990',
      usia: 36, // Hitungan usia pemohon
      jenis_kelamin: 'LAKI-LAKI',
      golongan_darah: 'O',
      alamat: 'JL. PAJAJARAN NO. 45 RT 02/05',
      kelurahan_desa: 'BARANANGSIANG',
      kecamatan: 'BOGOR TIMUR',
      agama: 'ISLAM',
      status_perkawinan: 'KAWIN',
      pekerjaan: 'KARYAWAN SWASTA',
      kewarganegaraan: 'WNI',
      berlaku_hingga: 'SEUMUR HIDUP'
    },

    // Data yang diinput pemohon di formulir pendaftaran
    data_formulir_pemohon: {
      nik: '3201011805900003',
      nama_lengkap: 'Hendra Pratama',
      tempat_lahir: 'Bogor',
      tanggal_lahir: '18-05-1990',
      usia: 36,
      jenis_kelamin: 'Laki-Laki',
      golongan_darah: 'O',
      alamat: 'Jl. Pajajaran No. 45 RT 02/05',
      kelurahan_desa: 'Baranangsiang',
      kecamatan: 'Bogor Timur',
      agama: 'Islam',
      status_perkawinan: 'Kawin',
      pekerjaan: 'Karyawan Swasta',
      kewarganegaraan: 'WNI',
      berlaku_hingga: 'Seumur Hidup'
    },

    // Aturan validasi hukum Dinsos (Permensos No. 110/2009)
    validasi_legalitas: {
      syarat_usia_cota: {
        aturan: 'Usia COTA minimal 30 tahun dan maksimal 55 tahun',
        status: 'lolos',
        detail: 'Usia 36 tahun memenuhi syarat (30-55 tahun)'
      },
      format_nik: {
        aturan: 'Format NIK 16 digit terdaftar',
        status: 'lolos',
        detail: '16 digit valid terverifikasi'
      },
      status_perkawinan: {
        aturan: 'Status Wajib Menikah Sah untuk Adopsi Berpasangan',
        status: 'lolos',
        detail: 'Status perkawinan tercatat KAWIN'
      }
    }
  },

  {
    id: 'DOC-COTA-KK-002',
    tipe_dokumen: 'kk_cota',
    kategori: 'COTA (Calon Orang Tua Angkat)',
    nama_dokumen: 'Kartu_Keluarga_Hendra_Pratama.jpg',
    ukuran_file: '2.1 MB',
    tanggal_unggah: '09 Okt 2026, 08:16 WIB',
    status: 'diverifikasi',
    skor_confidence: 97.4,
    catatan_ai: 'Scan Kartu Keluarga sangat jelas. Nomor KK 16 digit terverifikasi valid. Status hubungan suami & istri sah tercatat resmi dalam 1 KK Disdukcapil.',
    preview_type: 'kk',

    hasil_ekstraksi_ai: {
      nomor_kk: '3201012904190005',
      kepala_keluarga: 'HENDRA PRATAMA',
      nik_kepala_keluarga: '3201011805900003',
      nama_istri: 'SISKA AMELIA',
      nik_istri: '3201014508920002',
      status_perkawinan: 'KAWIN TERCATAT',
      alamat_kk: 'JL. PAJAJARAN NO. 45 RT 02/05',
      jumlah_anggota: 2
    },

    data_formulir_pemohon: {
      nomor_kk: '3201012904190005',
      kepala_keluarga: 'Hendra Pratama',
      nik_kepala_keluarga: '3201011805900003',
      nama_istri: 'Siska Amelia',
      nik_istri: '3201014508920002',
      status_perkawinan: 'Kawin Tercatat',
      alamat_kk: 'Jl. Pajajaran No. 45 RT 02/05',
      jumlah_anggota: 2
    },

    validasi_legalitas: {
      keabsahan_kk: {
        aturan: 'KK resmi terdaftar Disdukcapil Kabupaten Bogor',
        status: 'lolos',
        detail: '16 digit KK valid & terdaftar di database kependudukan'
      },
      status_pasangan: {
        aturan: 'Suami dan istri terdaftar dalam satu KK sah',
        status: 'lolos',
        detail: 'Hendra Pratama & Siska Amelia sah dalam 1 KK'
      }
    }
  },

  {
    id: 'DOC-COTA-NIKAH-003',
    tipe_dokumen: 'akta_nikah_cota',
    kategori: 'COTA (Calon Orang Tua Angkat)',
    nama_dokumen: 'Akta_Buku_Nikah_Kemenag.jpg',
    ukuran_file: '2.4 MB',
    tanggal_unggah: '09 Okt 2026, 08:18 WIB',
    status: 'menunggu_tinjauan_manual',
    skor_confidence: 76.4,
    catatan_ai: 'Terdapat sedikit bayangan/glare pada nomor register akta nikah. Nama suami terbaca "HENDRO PRATAMA" (kemungkinan typo/lipatan kertas, kemiripan string 87%). Tanggal nikah terdeteksi 12-10-2018 (durasi pernikahan 8 tahun). Perlu konfirmasi admin.',
    preview_type: 'nikah',

    hasil_ekstraksi_ai: {
      nomor_akta_nikah: '421/18/X/2018',
      nama_suami: 'HENDRO PRATAMA', // Typo AI OCR (aslinya Hendra)
      nama_istri: 'SISKA AMELIA',
      tanggal_nikah: '12-10-2018',
      durasi_nikah_tahun: 8,
      kua_penerbit: 'KUA KEC. BOGOR TIMUR',
      status_dokumen: 'DUPLIKAT_LEGALISIR'
    },

    data_formulir_pemohon: {
      nomor_akta_nikah: '421/18/X/2018',
      nama_suami: 'Hendra Pratama',
      nama_istri: 'Siska Amelia',
      tanggal_nikah: '12-10-2018',
      durasi_nikah_tahun: 8,
      kua_penerbit: 'KUA Kec. Bogor Timur',
      status_dokumen: 'Asli Berlegalisir'
    },

    validasi_legalitas: {
      syarat_durasi_nikah: {
        aturan: 'Usia pernikahan COTA minimal 5 tahun (Permensos No. 110/2009)',
        status: 'lolos',
        detail: 'Durasi pernikahan 8 tahun memenuhi kriteria (>= 5 tahun)'
      },
      kesesuaian_nama_suami: {
        aturan: 'Nama suami harus identik dengan KTP COTA',
        status: 'perlu_tinjauan',
        detail: 'AI membaca "HENDRO PRATAMA" vs formulir "Hendra Pratama"'
      }
    }
  },

  {
    id: 'DOC-DONASI-TRF-101',
    tipe_dokumen: 'bukti_transfer_donasi',
    kategori: 'Pusat Donasi Terpadu',
    nama_dokumen: 'Bukti_Transfer_BSI_2500000.png',
    ukuran_file: '950 KB',
    tanggal_unggah: '09 Okt 2026, 07:42 WIB',
    status: 'diverifikasi',
    skor_confidence: 99.2,
    catatan_ai: 'Struk mobile banking BSI terbaca sangat jelas. Nominal transfer, nomor rekening Dinas Sosial, dan kode referensi cocok 100% dengan log payment gateway gateway Dinsos.',
    preview_type: 'transfer_valid',

    hasil_ekstraksi_ai: {
      bank_pengirim: 'BANK SYARIAH INDONESIA (BSI)',
      nama_pengirim: 'MUHAMMAD RIZKY PRATAMA',
      bank_tujuan: 'BANK JABAR BANTEN (BJB) / BSI DINSOS',
      nomor_rekening_tujuan: '7118-2024-9988-01',
      nama_penerima: 'KAS SOSIAL ANAK BOGOR (DINSOS)',
      nominal: 2500000,
      nominal_terformat: 'Rp 2.500.000',
      tanggal_transaksi: '09-10-2026',
      waktu_transaksi: '07:38:12 WIB',
      nomor_referensi: 'BSI-REF-9928192083',
      berita_transfer: 'Donasi Nutrisi Balita Panti Kasih Bunda'
    },

    data_formulir_pemohon: {
      bank_pengirim: 'Bank Syariah Indonesia (BSI)',
      nama_pengirim: 'Muhammad Rizky Pratama',
      bank_tujuan: 'Bank Jabar Banten (BJB) / BSI Dinsos',
      nomor_rekening_tujuan: '7118-2024-9988-01',
      nama_penerima: 'Kas Sosial Anak Bogor (Dinsos)',
      nominal: 2500000,
      nominal_terformat: 'Rp 2.500.000',
      tanggal_transaksi: '09-10-2026',
      waktu_transaksi: '07:38:12 WIB',
      nomor_referensi: 'BSI-REF-9928192083',
      berita_transfer: 'Donasi Nutrisi Balita Panti Kasih Bunda'
    },

    validasi_legalitas: {
      rekening_resmi_dinsos: {
        aturan: 'Rekening penerima harus rekening resmi terdaftar Dinsos',
        status: 'lolos',
        detail: 'Rekening BSI Dinsos terverifikasi di kasda'
      },
      pencocokan_nominal: {
        aturan: 'Nominal transfer sesuai form donasi',
        status: 'lolos',
        detail: 'Rp 2.500.000 sesuai tanpa selisih'
      }
    }
  },

  {
    id: 'DOC-DONASI-TRF-102',
    tipe_dokumen: 'bukti_transfer_donasi_buram',
    kategori: 'Pusat Donasi Terpadu',
    nama_dokumen: 'Struk_ATM_Buram_Terpotong.jpg',
    ukuran_file: '620 KB',
    tanggal_unggah: '09 Okt 2026, 06:12 WIB',
    status: 'menunggu_tinjauan_manual',
    skor_confidence: 62.1,
    catatan_ai: 'Dokumen beresolusi rendah, teks nominal agak buram dan terpotong di tepi kanan. Angka nominal terbaca sekitar "Rp 500.00?" sedangkan formulir pemohon menuliskan Rp 750.000.',
    preview_type: 'transfer_buram',

    hasil_ekstraksi_ai: {
      bank_pengirim: 'ATM BNI',
      nama_pengirim: 'TI*** *** (TERPOTONG)',
      bank_tujuan: 'BJB DINSOS',
      nomor_rekening_tujuan: '7118-2024-****',
      nama_penerima: 'KAS SOSIAL ANAK',
      nominal: 500000,
      nominal_terformat: 'Rp 500.000 (Perkiraan OCR)',
      tanggal_transaksi: '09-10-2026',
      waktu_transaksi: '05:50 WIB',
      nomor_referensi: 'BNI-98421*** (BURAM)',
      berita_transfer: '-'
    },

    data_formulir_pemohon: {
      bank_pengirim: 'ATM BNI',
      nama_pengirim: 'Tita Maharani',
      bank_tujuan: 'BJB Dinsos',
      nomor_rekening_tujuan: '7118-2024-9988-01',
      nama_penerima: 'Kas Sosial Anak Bogor (Dinsos)',
      nominal: 750000,
      nominal_terformat: 'Rp 750.000',
      tanggal_transaksi: '09-10-2026',
      waktu_transaksi: '05:50 WIB',
      nomor_referensi: 'BNI-98421094',
      berita_transfer: 'Donasi Panti Asuhan'
    },

    validasi_legalitas: {
      ketajaman_gambar: {
        aturan: 'Gambar harus memiliki kontras dan resolusi memadai',
        status: 'gagal',
        detail: 'OCR confidence 62.1% di bawah ambang batas otomatis (85%)'
      },
      pencocokan_nominal: {
        aturan: 'Nominal transfer cocok dengan input form',
        status: 'selisih',
        detail: 'Form: Rp 750.000 vs OCR: Rp 500.000'
      }
    }
  }
];

/**
 * Daftar template alasan penolakan formal berdasarkan regulasi Dinsos
 */
export const REJECTION_REASONS = [
  {
    id: 'rej-usia-cota',
    label: 'Tidak Memenuhi Syarat Batas Usia COTA',
    regulasi: 'Permensos No. 110/HUK/2009 Pasal 7 (Usia harus 30 - 55 tahun)',
    template_pesan: 'Berdasarkan verifikasi dokumen identitas kependudukan, usia pemohon belum/sudah melampaui batas yang diatur dalam Permensos No. 110/2009 (minimal 30 tahun dan maksimal 55 tahun pada saat pengajuan).'
  },
  {
    id: 'rej-durasi-nikah',
    label: 'Usia Pernikahan Kurang dari 5 Tahun',
    regulasi: 'Permensos No. 110/HUK/2009 Pasal 8 Ayat 1',
    template_pesan: 'Calon Orang Tua Angkat yang berstatus menikah wajib memiliki usia perkawinan paling singkat 5 (lima) tahun dibuktikan dengan Akta Nikah resmi yang tercatat di KUA atau Disdukcapil.'
  },
  {
    id: 'rej-buram-fatal',
    label: 'Dokumen Fisik Rusak / Tidak Terbaca Sama Sekali',
    regulasi: 'SOP Verifikasi Berkas PIPA Dinsos',
    template_pesan: 'Citra dokumen yang diunggah mengalami kerusakan fisik, terpotong, atau resolusi tidak memungkinkan untuk dilakukan proses pembacaan identitas hukum.'
  },
  {
    id: 'rej-rekening-salah',
    label: 'Bukti Transfer Donasi Tidak Ditujukan ke Rekening Resmi Dinsos',
    regulasi: 'Peraturan Pengelolaan Kas Daerah & Donasi Sosial',
    template_pesan: 'Bukti transfer yang dilampirkan tidak terdaftar pada rekening penampungan donasi resmi Dinas Sosial Kabupaten Bogor.'
  }
];

/**
 * Daftar alasan minta unggah ulang / dokumen tambahan
 */
export const REUPLOAD_REASONS = [
  'Foto KTP buram atau terdapat pantulan kilatan cahaya (glare)',
  'Sudut dokumen terpotong sehingga NIK/Nama tidak utuh',
  'Lampiran Akta Nikah belum disertai stempel legalisir KUA resmi',
  'Nominal struk transfer ATM pudar atau tidak terbaca',
  'Surat Keterangan Sehat dari RS Pemerintah belum ditandatangani dokter spesialis'
];
