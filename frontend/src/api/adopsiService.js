import apiClient from './apiClient';

export const adopsiService = {
  // ==========================================
  // SISI WARGA (PEMOHON COTA)
  // ==========================================

  /**
   * Pengecekan kelayakan awal pemohon COTA (usia 30-55 thn, usia pernikahan >= 5 thn)
   */
  async checkEligibility({ tanggal_lahir_pemohon, tanggal_pernikahan }) {
    const response = await apiClient.post('/api/masyarakat/pengajuan-adopsi/cek-kelayakan', {
      nama_pemohon: 'Pengecekan Kelayakan',
      tanggal_lahir_pemohon,
      tanggal_pernikahan,
      dokumen_ktp: 'temp',
      dokumen_kk: 'temp',
    });
    return response.data;
  },

  /**
   * Unggah dokumen fisik KTP & KK menggunakan multipart/form-data
   * Backend langsung memicu Single-Agent AI OCR internal untuk ekstraksi dan skor confidence
   */
  async uploadKtpKk(ktpFile, kkFile) {
    const formData = new FormData();
    formData.append('ktp', ktpFile);
    formData.append('kk', kkFile);

    const response = await apiClient.post('/api/upload/ktp-adopsi', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Unggah 4 berkas awal COTA (Akta kelahiran, Buku nikah, SKCK, Surat Sehat)
   */
  async uploadDokumenAwal({ aktaKelahiran, bukuNikah, skck, suratSehat }) {
    const formData = new FormData();
    if (aktaKelahiran) formData.append('akta_kelahiran', aktaKelahiran);
    if (bukuNikah) formData.append('buku_nikah', bukuNikah);
    if (skck) formData.append('skck', skck);
    if (suratSehat) formData.append('surat_sehat', suratSehat);

    const response = await apiClient.post('/api/upload/dokumen-awal-adopsi', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Unggah dokumen tambahan adopsi
   */
  async uploadDokumenTambahan(jenisDokumen, file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/upload/dokumen-tambahan-adopsi', formData, {
      params: { jenis_dokumen: jenisDokumen },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Submit berkas pengajuan adopsi COTA secara lengkap
   */
  async submitPengajuan(data) {
    const response = await apiClient.post('/api/masyarakat/pengajuan-adopsi', data);
    return response.data;
  },

  async submitAdopsi(data) {
    return this.submitPengajuan(data);
  },

  /**
   * Mengambil daftar riwayat pengajuan adopsi milik pemohon
   */
  async getMyAdoptions() {
    const response = await apiClient.get('/api/masyarakat/pengajuan-adopsi');
    return response.data;
  },

  /**
   * Mengambil detail pengajuan adopsi milik pemohon
   */
  async getMyAdoptionDetail(id) {
    const response = await apiClient.get(`/api/masyarakat/pengajuan-adopsi/${id}`);
    return response.data;
  },

  // ==========================================
  // SISI SUPER ADMIN DINSOS (VERIFIKASI & AI)
  // ==========================================

  /**
   * Mengambil seluruh antrean berkas adopsi COTA
   */
  async getAdminAdoptions() {
    const response = await apiClient.get('/api/admin/pengajuan-adopsi');
    return response.data;
  },

  /**
   * Mengambil detail berkas adopsi lengkap beserta hasil analisis AI Single-Agent
   */
  async getAdminAdoptionDetail(id) {
    const response = await apiClient.get(`/api/admin/pengajuan-adopsi/${id}`);
    return response.data;
  },

  /**
   * Memicu analisis ulang dokumen COTA menggunakan model AI Internal
   */
  async reanalyzeAdoptionAI(id) {
    const response = await apiClient.post(`/api/admin/pengajuan-adopsi/${id}/analisis-ai`);
    return response.data;
  },

  /**
   * Memperbarui keputusan verifikasi Admin Dinsos:
   * 'diverifikasi' (Setujui Dokumen) | 'butuh_dokumen_tambahan' (Minta Unggah Ulang) | 'ditolak' (Tolak)
   */
  async updateAdoptionStatus(id, newStatus) {
    const response = await apiClient.patch(
      `/api/admin/pengajuan-adopsi/${id}/status`,
      null,
      {
        params: { new_status: newStatus },
      }
    );
    return response.data;
  },
};

export default adopsiService;
