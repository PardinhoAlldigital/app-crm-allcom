
import { Contract, Order } from '../types';
import { Contracts } from '../types/contractsTypes';

/**
 * Filter contracts by type
 * @param contracts - Array of contracts
 * @param filter - Filter key ('all' | 'Simcard' | 'Comodato' | 'Jurídico' | 'Simcard Isca' | 'Lora' | 'Substituição' | 'Flex' | 'Satelital' | 'Api Allmanager')
 * @returns Filtered contracts array
 */
export const filterContracts = (contracts: Contracts[], filter: string): Contracts[] => {
  if (filter === 'all') return contracts;
  return contracts.filter(contract => contract.type_contract === filter);
};

/**
 * Filter orders by status
 * @param orders - Array of orders
 * @param filter - Filter key ('all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
 * @returns Filtered orders array
 */
export const filterOrders = (orders: Order[], filter: string): Order[] => {
  if (filter === 'all') return orders;
  return orders.filter(order => order.status === filter);
};

export const contractFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'Simcard', label: 'Simcard' },
  { key: 'Comodato', label: 'Comodato' },
  { key: 'Jurídico', label: 'Jurídico' },
  { key: 'Simcard Isca', label: 'Simcard Isca' },
  { key: 'Lora', label: 'Lora' },
  { key: 'Substituição', label: 'Substituição' },
  { key: 'Flex', label: 'Flex' },
  { key: 'Satelital', label: 'Satelital' },
  { key: 'Api Allmanager', label: 'Api Allmanager' },
];

export const orderFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'processing', label: 'Processando' },
  { key: 'shipped', label: 'Enviados' },
  { key: 'delivered', label: 'Entregues' },
  { key: 'cancelled', label: 'Cancelados' },
];

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns Boolean indicating if password meets requirements
 */
export const validatePassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

/**
 * Validates phone number format
 * @param phone - Phone string to validate
 * @returns Boolean indicating if phone is valid
 */
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
};

/**
 * Validates CPF format and check digit
 * @param cpf - CPF string to validate
 * @returns Boolean indicating if CPF is valid
 */
export const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false; // All same digits
  
  // Check digit validation
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};