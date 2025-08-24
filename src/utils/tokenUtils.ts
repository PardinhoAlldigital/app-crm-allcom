import { store } from '../store';

/**
 * Função utilitária para obter o token de autenticação do Redux store
 * @returns {string | null} Token de autenticação ou null se não estiver logado
 */
export const getToken = (): string | null => {
  const state = store.getState();
  return state.auth.token;
};

/**
 * Função utilitária para verificar se o usuário está autenticado
 * @returns {boolean} True se o usuário estiver autenticado
 */
export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isAuthenticated && !!state.auth.token;
};

/**
 * Função utilitária para obter os dados do usuário logado
 * @returns {User | null} Dados do usuário ou null se não estiver logado
 */
export const getCurrentUser = () => {
  const state = store.getState();
  return state.auth.user;
};