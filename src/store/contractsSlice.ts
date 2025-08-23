import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContractsState, Contract } from '../types';
import { contractsService } from '../services/contractsService';
// import { contractsService } from '../services/contractsService';

const initialState: ContractsState = {
  contracts: [],
  isLoading: false,
  error: null,
};

export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async () => {
    const response = await contractsService.getContracts();
    return response;
  }
);

export const createContract = createAsyncThunk(
  'contracts/createContract',
  async (contractData: Omit<Contract, 'id' | 'createdAt'>) => {
    const response = await contractsService.createContract(contractData);
    return response;
  }
);

export const updateContract = createAsyncThunk(
  'contracts/updateContract',
  async ({ id, data }: { id: string; data: Partial<Contract> }) => {
    const response = await contractsService.updateContract(id, data);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contracts = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Erro ao carregar contratos';
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.contracts.push(action.payload);
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        const index = state.contracts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.contracts[index] = action.payload;
        }
      });
  },
});

export const { clearError } = contractsSlice.actions;
export default contractsSlice.reducer;