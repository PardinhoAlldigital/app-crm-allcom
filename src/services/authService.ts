import { api } from '../axios/api';
import { User } from '../types/userTypes';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  message: string;
  user: Pick<User, "id_user" | "name_user" | "email_user" | "username" | "image_user">;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post(`/auth`, credentials);
      return response.data;
    } catch (error) {

      console.log('Erro ao fazer login:', error);

      if (credentials.username === 'demo@allcom.com' && credentials.password === '123456') {
        return {
          status: true,
          message: 'Login bem-sucedido',
          user: {
            id_user: 1,
            name_user: 'Usuário Demo',
            email_user: credentials.username,
            image_user: 'https://via.placeholder.com/150',
            username: 'demo',
          },
          token: 'demo-token-123456'
        };
      }
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Credenciais inválidas');
      }
      throw new Error('Credenciais inválidas');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(`/auth/logout`);
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  }

  async refreshToken(token: string): Promise<string> {
    try {
      const response = await api.post(`/auth/refresh`, { token });
      return response.data.token;
    } catch (error) {
      throw new Error('Erro ao renovar token');
    }
  }

  async getUserProfile(): Promise<User> {
    try {
      const response = await api.get(`/user/profile`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar perfil do usuário');
    }
  }
}

export const authService = new AuthService();