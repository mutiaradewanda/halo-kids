import apiClient from './apiClient';

export const donasiService = {
  /**
   * Mengunggah file struk/bukti transfer donasi (multipart/form-data)
   * Backend langsung memicu AI internal untuk mengekstrak nominal dan tanggal
   */
  async uploadBuktiTransfer(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/upload/bukti-transfer', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Mengirim data donasi (baik donasi uang dengan bukti transfer, maupun donasi paket barang)
   */
  async createDonasi(data) {
    const response = await apiClient.post('/api/masyarakat/donasi', data);
    return response.data;
  },

  /**
   * Mengambil riwayat donasi pengguna yang sedang login
   */
  async getMyDonations() {
    const response = await apiClient.get('/api/masyarakat/donasi');
    return response.data;
  },

  /**
   * Mengambil seluruh data donasi untuk Admin Dinsos
   */
  async getAdminDonations() {
    const response = await apiClient.get('/api/admin/donasi');
    return response.data;
  },

  /**
   * Memperbarui status verifikasi donasi oleh Admin Dinsos
   */
  async updateDonasiStatus(donationId, newStatus) {
    const response = await apiClient.patch(
      `/api/admin/donasi/${donationId}/status`,
      null,
      {
        params: { new_status: newStatus },
      }
    );
    return response.data;
  },

  /**
   * Memicu analisis bukti transfer dengan AI internal
   */
  async analyzeProofAI(donationId) {
    const response = await apiClient.post(`/api/admin/donasi/${donationId}/analisis-bukti-ai`);
    return response.data;
  },
};

export default donasiService;
