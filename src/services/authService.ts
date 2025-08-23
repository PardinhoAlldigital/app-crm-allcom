import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = 'https://api.allcom.com'; // Substitua pela URL real da sua API

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Simulação de login - substitua pela chamada real da API
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      // Para demonstração, vamos simular um login bem-sucedido
      // Em produção, remova esta simulação
      if (credentials.email === 'demo@allcom.com' && credentials.password === '123456') {
        return {
          user: {
            id: '1',
            name: 'Usuário Demo',
            email: credentials.email,
            avatar: 'https://via.placeholder.com/150',
            phone: '(11) 99999-9999'
          },
          token: 'demo-token-123456'
        };
      }
      throw new Error('Credenciais inválidas');
    }
  }

  async logout(): Promise<void> {
    try {
      // Chamada para a API de logout
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      // Em caso de erro, apenas limpe os dados locais
      console.log('Erro ao fazer logout:', error);
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { token });
      return response.data.token;
    } catch (error) {
      throw new Error('Erro ao renovar token');
    }
  }

  async getUserProfile(token: string): Promise<User> {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar perfil do usuário');
    }
  }
}

export const authService = new AuthService();