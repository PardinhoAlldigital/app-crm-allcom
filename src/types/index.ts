import { Contracts, ContractsState } from "./contractsTypes";
import { User } from "./userTypes";

export interface Contract {
  id: string;
  title: string;
  description: string;
  value: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  client: string;
  createdAt: string;
}

export interface Order {
  id: string;
  title: string;
  description: string;
  value: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  client: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}


export interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  contracts: ContractsState;
  orders: OrdersState;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Contracts: undefined;
  Orders: undefined;
};