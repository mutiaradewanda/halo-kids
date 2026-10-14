import apiClient, { 
  TOKEN_STORAGE_KEY, 
  SESSION_STORAGE_KEY, 
  decodeJwt 
} from './apiClient';

/**
 * Pemetaan peran backend FastAPI ke label dan kode mode frontend
 * Backend roles: 'masyarakat' | 'pengelola-panti' | 'admin'
 */
export function mapBackendRoleToFrontend(role) {
  const normalized = (role || '').toLowerCase();
  if (normalized === 'admin') {
    return {
      role: 'Super Admin',
      roleCode: 'admin',
      roleMode: 'superadmin',
      roleLabel: 'Dinas Sosial (Super Admin)',
    };
  }
  if (normalized === 'pengelola-panti' || normalized === 'pengelola panti') {
    return {
      role: 'Admin Panti',
      roleCode: 'pengelola-panti',
      roleMode: 'pantiadmin',
      roleLabel: 'Pengelola Panti Asuhan / LKSA',
    };
  }
  return {
    role: 'User Publik',
    roleCode: 'masyarakat',
    roleMode: 'user',
    roleLabel: 'Masyarakat / Warga Umum',
  };
}

export const authService = {
  /**
   * Login user dengan email dan password.
   * Endpoint FastAPI /api/auth/login menggunakan OAuth2PasswordRequestForm
   * sehingga body dikirim sebagai form URL-encoded (username = email, password = password).
   */
  async login(email, password) {
    const params = new URLSearchParams();
    params.append('username', email.trim());
    params.append('password', password);

    const response = await apiClient.post('/api/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, token_type } = response.data;
    localStorage.setItem(TOKEN_STORAGE_KEY, access_token);

    // Decode isi token JWT
    const jwtPayload = decodeJwt(access_token);
    const backendRole = jwtPayload?.role || 'masyarakat';
    const roleMeta = mapBackendRoleToFrontend(backendRole);

    let profileData = {
      id: jwtPayload?.sub ? parseInt(jwtPayload.sub, 10) : null,
      email: email.trim(),
      name: email.split('@')[0],
      ...roleMeta,
    };

    // Ambil profil lengkap dari endpoint sesuai peran
    try {
      if (backendRole === 'masyarakat') {
        const meRes = await apiClient.get('/api/masyarakat/me');
        if (meRes.data) {
          profileData = {
            ...profileData,
            ...meRes.data,
            name: meRes.data.nama || profileData.name,
            phone: meRes.data.no_hp || '',
            ...roleMeta,
          };
        }
      } else if (backendRole === 'pengelola-panti') {
        try {
          const pantiRes = await apiClient.get('/api/panti/me');
          if (pantiRes.data) {
            profileData = {
              ...profileData,
              managedPanti: pantiRes.data,
              pantiName: pantiRes.data.nama_panti,
              ...roleMeta,
            };
          }
        } catch {
          // Bila data panti belum terikat
        }
      }
    } catch {
      // Abaikan jika me request gagal, gunakan data dari token JWT
    }

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profileData));
    return { token: access_token, tokenType: token_type, user: profileData };
  },

  /**
   * Pendaftaran akun baru (otomatis role: 'masyarakat')
   */
  async register({ nama, email, password, no_hp, role = 'masyarakat' }) {
    const payload = {
      nama: nama.trim(),
      email: email.trim(),
      password,
      no_hp: no_hp ? no_hp.trim() : null,
    };
    if (role) {
      payload.role = role;
    }
    const response = await apiClient.post('/api/auth/register', payload);
    return response.data;
  },

  /**
   * Ambil data profil user yang sedang login
   */
  async getMyProfile(role = 'masyarakat') {
    if (role === 'pengelola-panti') {
      const res = await apiClient.get('/api/panti/me');
      return res.data;
    }
    const res = await apiClient.get('/api/masyarakat/me');
    return res.data;
  },

  /**
   * Ambil session aktif dari localStorage
   */
  getStoredSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Logout dan bersihkan session
   */
  logout() {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  },
};

export default authService;
