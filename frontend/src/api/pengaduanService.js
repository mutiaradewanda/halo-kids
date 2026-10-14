import apiClient from './apiClient';

export const pengaduanService = {
  /**
   * Membuat laporan pengaduan baru (Bisa publik anonim atau otomatis terikat jika login)
   * Mengembalikan kode tiket pelacakan resmi dari backend (cth: HK-20261011-XXXXXXXX)
   */
  async createPengaduan({ isi_laporan, jenis_laporan }) {
    const response = await apiClient.post('/api/public/pengaduan', {
      isi_laporan: isi_laporan.trim(),
      jenis_laporan: jenis_laporan.trim(),
    });
    return response.data;
  },

  /**
   * Melacak status pengaduan publik berdasarkan kode tiket resmi
   */
  async trackPengaduan(kodeTiket) {
    const cleanKode = kodeTiket.trim().toUpperCase();
    const response = await apiClient.get(`/api/public/pengaduan/${encodeURIComponent(cleanKode)}`);
    return response.data;
  },

  /**
   * Mengambil riwayat pengaduan yang diajukan oleh user login (Masyarakat)
   */
  async getMyPengaduan() {
    const response = await apiClient.get('/api/masyarakat/pengaduan/saya');
    return response.data;
  },

  /**
   * Mengambil seluruh pengaduan masuk untuk Admin Dinsos
   */
  async getAdminPengaduan() {
    const response = await apiClient.get('/api/admin/pengaduan');
    return response.data;
  },

  /**
   * Mengubah status pengaduan oleh Admin Dinsos (baru / diproses / selesai / ditolak)
   */
  async updatePengaduanStatus(reportId, newStatus) {
    const response = await apiClient.patch(
      `/api/admin/pengaduan/${reportId}/status`,
      null,
      {
        params: { new_status: newStatus },
      }
    );
    return response.data;
  },
};

export default pengaduanService;
