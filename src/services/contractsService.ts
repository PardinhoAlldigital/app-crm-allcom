import axios from 'axios';
import { Contract } from '../types';

const API_BASE_URL = 'https://api.allcom.com';

class ContractsService {
  async getContracts(): Promise<Contract[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/contracts`);
      return response.data;
    } catch (error) {
      return [
        {
          id: '1',
          title: 'Contrato de Desenvolvimento Web',
          description: 'Desenvolvimento de sistema web completo para gestão empresarial',
          value: 25000,
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-06-15',
          client: 'Empresa ABC Ltda',
          createdAt: '2024-01-10T10:00:00Z'
        },
        {
          id: '2',
          title: 'Contrato de Manutenção de Sistema',
          description: 'Manutenção mensal do sistema de vendas',
          value: 5000,
          status: 'pending',
          startDate: '2024-02-01',
          endDate: '2024-12-31',
          client: 'Tech Solutions Inc',
          createdAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '3',
          title: 'Contrato de Consultoria',
          description: 'Consultoria em transformação digital',
          value: 15000,
          status: 'completed',
          startDate: '2023-10-01',
          endDate: '2023-12-31',
          client: 'Digital Corp',
          createdAt: '2023-09-25T09:15:00Z'
        }
      ];
    }
  }

  async createContract(contractData: Omit<Contract, 'id' | 'createdAt'>): Promise<Contract> {
    try {
      const response = await axios.post(`${API_BASE_URL}/contracts`, contractData);
      return response.data;
    } catch (error) {
      // Simulação de criação
      const newContract: Contract = {
        ...contractData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      return newContract;
    }
  }

  async updateContract(id: string, data: Partial<Contract>): Promise<Contract> {
    try {
      const response = await axios.put(`${API_BASE_URL}/contracts/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar contrato');
    }
  }

  async deleteContract(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/contracts/${id}`);
    } catch (error) {
      throw new Error('Erro ao deletar contrato');
    }
  }

  async getContractById(id: string): Promise<Contract> {
    try {
      const response = await axios.get(`${API_BASE_URL}/contracts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar contrato');
    }
  }
}

export const contractsService = new ContractsService();