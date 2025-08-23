import axios from 'axios';
import { Order } from '../types';

const API_BASE_URL = 'https://api.allcom.com'; // Substitua pela URL real da sua API

class OrdersService {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      return response.data;
    } catch (error) {
      // Para demonstração, vamos retornar dados mockados
      return [
        {
          id: '1',
          title: 'Pedido de Material de Escritório',
          description: 'Compra de materiais para escritório - papelaria e suprimentos',
          value: 1500,
          status: 'delivered',
          orderDate: '2024-01-20',
          deliveryDate: '2024-01-25',
          client: 'Escritório Central',
          items: [
            {
              id: '1',
              name: 'Papel A4',
              quantity: 10,
              price: 25,
              total: 250
            },
            {
              id: '2',
              name: 'Canetas',
              quantity: 50,
              price: 2.5,
              total: 125
            }
          ],
          createdAt: '2024-01-20T08:00:00Z'
        },
        {
          id: '2',
          title: 'Pedido de Equipamentos de TI',
          description: 'Aquisição de notebooks e periféricos para equipe',
          value: 15000,
          status: 'processing',
          orderDate: '2024-01-22',
          client: 'Departamento de TI',
          items: [
            {
              id: '3',
              name: 'Notebook Dell',
              quantity: 3,
              price: 4500,
              total: 13500
            },
            {
              id: '4',
              name: 'Mouse Wireless',
              quantity: 3,
              price: 150,
              total: 450
            }
          ],
          createdAt: '2024-01-22T10:30:00Z'
        },
        {
          id: '3',
          title: 'Pedido de Móveis',
          description: 'Mobiliário para nova sala de reuniões',
          value: 8500,
          status: 'shipped',
          orderDate: '2024-01-18',
          deliveryDate: '2024-01-28',
          client: 'Facilities',
          items: [
            {
              id: '5',
              name: 'Mesa de Reunião',
              quantity: 1,
              price: 3500,
              total: 3500
            },
            {
              id: '6',
              name: 'Cadeiras Executivas',
              quantity: 8,
              price: 625,
              total: 5000
            }
          ],
          createdAt: '2024-01-18T14:15:00Z'
        }
      ];
    }
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      // Simulação de criação
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      return newOrder;
    }
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar pedido');
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
    } catch (error) {
      throw new Error('Erro ao deletar pedido');
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pedido');
    }
  }
}

export const ordersService = new OrdersService();