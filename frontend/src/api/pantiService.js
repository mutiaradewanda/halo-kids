import apiClient from './apiClient';

export const pantiService = {
  // ==========================================
  // ENDPOINT PUBLIK
  // ==========================================

  /**
   * Mengambil daftar panti asuhan publik (bisa difilter wilayah/kecamatan)
   */
  async getPublicPantiList(wilayah = '') {
    const params = {};
    if (wilayah && wilayah !== 'Semua') {
      params.wilayah = wilayah;
    }
    const response = await apiClient.get('/api/public/panti', { params });
    return response.data;
  },

  /**
   * Mengambil detail panti publik berdasarkan ID
   */
  async getPublicPantiDetail(pantiId) {
    const response = await apiClient.get(`/api/public/panti/${pantiId}`);
    return response.data;
  },

  /**
   * Mengambil wishlist kebutuhan barang panti tertentu (Publik)
   */
  async getPublicWishlist(pantiId) {
    const response = await apiClient.get(`/api/public/panti/${pantiId}/wishlist`);
    return response.data;
  },

  /**
   * Mengambil foto galeri panti tertentu (Publik)
   */
  async getPublicGallery(pantiId) {
    const response = await apiClient.get(`/api/public/panti/${pantiId}/galeri`);
    return response.data;
  },

  /**
   * Mengambil laporan dana panti tertentu (Publik)
   */
  async getPublicDanaReports(pantiId) {
    const response = await apiClient.get(`/api/public/panti/${pantiId}/laporan-dana`);
    return response.data;
  },

  // ==========================================
  // ENDPOINT PENGELOLA PANTI (ADMIN LKSA)
  // ==========================================

  /**
   * Mengambil data panti yang dikelola oleh akun pengelola yang sedang login
   */
  async getManagedPanti() {
    const response = await apiClient.get('/api/panti/me');
    return response.data;
  },

  /**
   * Mengupdate informasi profil panti yang dikelola
   */
  async updateManagedPanti(data) {
    const response = await apiClient.put('/api/panti/me', data);
    return response.data;
  },

  /**
   * Mengambil daftar seluruh wishlist panti yang dikelola
   */
  async getWishlist() {
    const response = await apiClient.get('/api/panti/wishlist');
    return response.data;
  },

  /**
   * Menambahkan barang kebutuhan baru ke wishlist panti
   */
  async createWishlist({ nama_barang, jumlah_kebutuhan }) {
    const response = await apiClient.post('/api/panti/wishlist', {
      nama_barang: nama_barang.trim(),
      jumlah_kebutuhan: parseInt(jumlah_kebutuhan, 10),
    });
    return response.data;
  },

  /**
   * Mengupdate barang kebutuhan wishlist panti
   */
  async updateWishlist(wishlistId, { nama_barang, jumlah_kebutuhan, jumlah_terpenuhi }) {
    const payload = {};
    if (nama_barang !== undefined) payload.nama_barang = nama_barang.trim();
    if (jumlah_kebutuhan !== undefined) payload.jumlah_kebutuhan = parseInt(jumlah_kebutuhan, 10);
    if (jumlah_terpenuhi !== undefined) payload.jumlah_terpenuhi = parseInt(jumlah_terpenuhi, 10);

    const response = await apiClient.put(`/api/panti/wishlist/${wishlistId}`, payload);
    return response.data;
  },

  /**
   * Menghapus barang dari wishlist panti
   */
  async deleteWishlist(wishlistId) {
    const response = await apiClient.delete(`/api/panti/wishlist/${wishlistId}`);
    return response.data;
  },

  /**
   * Mengambil daftar rekapitulasi donasi uang & barang yang masuk ke panti ini
   */
  async getPantiDonations() {
    const response = await apiClient.get('/api/panti/donasi');
    return response.data;
  },

  /**
   * Memperbarui status verifikasi donasi pemohon (menunggu / terverifikasi / ditolak)
   */
  async updateDonationStatus(donationId, newStatus) {
    const response = await apiClient.patch(
      `/api/panti/donasi/${donationId}/status`,
      null,
      {
        params: { new_status: newStatus },
      }
    );
    return response.data;
  },

  /**
   * Mengunggah dokumen file laporan dana panti (PDF/gambar)
   */
  async uploadLaporanDana(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/panti/laporan-dana', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default pantiService;
