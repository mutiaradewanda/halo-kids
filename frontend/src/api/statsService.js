import apiClient from './apiClient';

export const statsService = {
  /**
   * Mengambil statistik publik transparansi (total panti, kuota anak, adopsi resmi, laporan selesai)
   */
  async getPublicStatistics() {
    const response = await apiClient.get('/api/public/statistics');
    return response.data;
  },

  /**
   * Mengambil statistik ringkasan dashboard untuk Admin Dinsos
   */
  async getAdminDashboardStats(startDate = null, endDate = null) {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    const response = await apiClient.get('/api/admin/dashboard/stats', { params });
    return response.data;
  },

  /**
   * Mengambil kalender kunjungan panti
   */
  async getVisitCalendar(pantiId = null, hanyaMendatang = false) {
    const params = { hanya_mendatang: hanyaMendatang };
    if (pantiId) params.panti_id = pantiId;
    const response = await apiClient.get('/api/public/kalender-kunjungan', { params });
    return response.data;
  },
};

export default statsService;
