import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  Contract } from '../types';
import { contractsService } from '../services/contractsService';
import { Contracts, ContractsState } from '../types/contractsTypes';
// import { contractsService } from '../services/contractsService';

interface ExtendedContractsState extends ContractsState {
  currentPage: number;
  lastPage: number;
  total: number;
  hasMore: boolean;
  currentFilter: string;
}

const initialState: ExtendedContractsState = {
  contracts: [] as Contracts[],
  isLoading: false,
  error: null,
  currentPage: 1,
  lastPage: 1,
  total: 0,
  hasMore: true,
  currentFilter: 'all',
};

interface FetchContractsParams {
  page?: number;
  type_contract?: string;
  loadMore?: boolean;
}

export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async (params: FetchContractsParams = {}) => {
    const { page = 1, type_contract = 'all', loadMore = false } = params;
    const response = await contractsService.getContracts({
      page,
      per_page: 15,
      type_contract
    });
    return { ...response, loadMore };
  }
);

export const createContract = createAsyncThunk(
  'contracts/createContract',
  async (contractData: Omit<Contracts, 'id_contract' | 'created_at_contract'>) => {
    const response = await contractsService.createContract(contractData);
    return response;
  }
);

export const updateContract = createAsyncThunk(
  'contracts/updateContract',
  async ({ id, data }: { id: number; data: Partial<Contracts> }) => {
    const response = await contractsService.updateContract(id.toString(), data);
    return response;
  }
);

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetContracts: (state) => {
      state.contracts = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    setCurrentFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, current_page, last_page, total, loadMore } = action.payload;
        
        if (loadMore) {
          // Adicionar novos contratos à lista existente (paginação)
          state.contracts = [...state.contracts, ...data];
        } else {
          // Substituir lista (novo filtro)
          state.contracts = data;
        }
        
        state.currentPage = current_page;
        state.lastPage = last_page;
        state.total = total;
        state.hasMore = current_page < last_page;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erro ao carregar contratos';
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.contracts.unshift(action.payload);
        state.total += 1;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        const index = state.contracts.findIndex(c => c.id_contract === action.payload.id_contract);
        if (index !== -1) {
          state.contracts[index] = action.payload;
        }
      });
  },
});

export const { clearError, resetContracts, setCurrentFilter } = contractsSlice.actions;
export default contractsSlice.reducer;