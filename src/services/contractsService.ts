import axios from 'axios';
// import { Contract } from '../types';
import { api } from '../axios/api';
import { Contracts } from '../types/contractsTypes';

interface GetContractsParams {
  page?: number;
  per_page?: number;
  type_contract?: string;
}

interface ContractsResponse {
  data: Contracts[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

class ContractsService {
  async getContracts(params: GetContractsParams = {}): Promise<ContractsResponse> {
    try {
      const { page = 1, per_page = 15, type_contract } = params;
      
      let url = `/contract/list?page=${page}&per_page=${per_page}`;
      
      if (type_contract && type_contract !== 'all') {
        url += `&type_contract=${encodeURIComponent(type_contract)}`;
      }
      
      const response = await api.get(url);
      
      // Verificar se a resposta tem uma estrutura específica
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return {
          data: response.data.data,
          current_page: response.data.current_page || page,
          last_page: response.data.last_page || 1,
          per_page: response.data.per_page || per_page,
          total: response.data.total || response.data.data.length
        };
      }
      
      // Se já é um array, retornar com estrutura de paginação
      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          current_page: page,
          last_page: 1,
          per_page: per_page,
          total: response.data.length
        };
      }
      
      // Se não é um array, retornar estrutura vazia
      return {
        data: [],
        current_page: page,
        last_page: 1,
        per_page: per_page,
        total: 0
      };
    } catch (error) {
      throw new Error('Erro ao buscar contratos');
    }
  }

  async createContract(contractData: Omit<Contracts, 'id_contract' | 'created_at_contract'>): Promise<Contracts> {
    try {
      const response = await api.post(`/contracts`, contractData);
      return response.data;
    } catch (error) {
      // Simulação de criação
      const newContract: Contracts = {
        ...contractData,
        id_contract: Date.now(),
        created_at_contract: new Date().toISOString()
      };
      return newContract;
    }
  }

  async updateContract(id: string, data: Partial<Contracts>): Promise<Contracts> {  
    try {
      const response = await api.put(`/contracts/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar contrato');
    }
  }

  async deleteContract(id: number): Promise<void> {
    try {
      await api.delete(`/contracts/${id}`);
    } catch (error) {
      throw new Error('Erro ao deletar contrato');
    }
  }

  async getContractById(id: string): Promise<Partial<Contracts>> {
    try {
      const response = await api.get(`/contracts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar contrato');
    }
  }
}

export const contractsService = new ContractsService();