import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchOrders } from '../store/ordersSlice';
import { theme } from '../styles/theme';
import { Order } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ItemsContainer } from '../components/Container';
import { HeaderTitle } from '../components/HeaderTitle';
import { AddButton } from '../components/AddButton';
import { Content } from '../components/Content';
import { Header } from '../components/Header';
import { FilterButton, FilterButtonText, FilterContainer } from '../components/FiltersCompoents';
import { EmptyDescription, EmptyIcon, EmptyState, EmptyTitle } from '../components/EmptyComponents';
import { CardDescription, CardFooter, CardHeader, CardInfo, CardTitle, CardValue, OrderCard } from '../components/CardComponents';
import { StatusOrderBadge, StatusText } from '../components/StatusComponets';
import { ClientText, DateText, ItemsTitle, ItemText } from '../components/TextComponents';
import { InfoIcon, InfoItem, InfoText } from '../components/InfoComponents';
import { formatCurrency, formatDate, filterOrders, orderFilters } from '../utils';

interface OrdersScreenProps {
  navigation: any;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector(state => state.orders);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchOrders());
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'processing': return 'Processando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredOrders = filterOrders(orders, filter);

  const handleOrderPress = (order: Order) => {
    const itemsList = order.items.map(item => 
      `• ${item.name} (${item.quantity}x) - ${formatCurrency(item.total)}`
    ).join('\n');

    Alert.alert(
      order.title,
      `Cliente: ${order.client}\nValor Total: ${formatCurrency(order.value)}\nStatus: ${getStatusText(order.status)}\nData do Pedido: ${formatDate(order.orderDate)}${order.deliveryDate ? `\nData de Entrega: ${formatDate(order.deliveryDate)}` : ''}\n\nItens:\n${itemsList}\n\nDescrição:\n${order.description}`,
      [{ text: 'OK' }]
    );
  };

  const handleAddOrder = () => {
    Alert.alert('Em breve', 'Funcionalidade de adicionar pedido em desenvolvimento');
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Pedidos</HeaderTitle>
        <AddButton onPress={handleAddOrder}>
          <Icon name="add" size={24} color={theme.colors.text.white} />
        </AddButton>
      </Header>

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FilterContainer>
          {orderFilters.map(filterItem => (
            <FilterButton
              key={filterItem.key}
              active={filter === filterItem.key}
              onPress={() => setFilter(filterItem.key)}
            >
              <FilterButtonText active={filter === filterItem.key}>
                {filterItem.label}
              </FilterButtonText>
            </FilterButton>
          ))}
        </FilterContainer>

        {filteredOrders.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Icon name="shopping-cart" size={40} color={theme.colors.primary} />
            </EmptyIcon>
            <EmptyTitle>Nenhum pedido encontrado</EmptyTitle>
            <EmptyDescription>
              {filter === 'all' 
                ? 'Você ainda não possui pedidos cadastrados.\nToque no botão + para adicionar seu primeiro pedido.'
                : `Não há pedidos com o status "${orderFilters.find(f => f.key === filter)?.label.toLowerCase()}".`
              }
            </EmptyDescription>
          </EmptyState>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              onPress={() => handleOrderPress(order)}
            >
              <CardHeader>
                <CardTitle numberOfLines={2}>{order.title}</CardTitle>
                <StatusOrderBadge status={order.status}>
                  <StatusText>{getStatusText(order.status)}</StatusText>
                </StatusOrderBadge>
              </CardHeader>

              <CardDescription numberOfLines={2}>
                {order.description}
              </CardDescription>

              <ItemsContainer>
                <ItemsTitle>Itens ({order.items.length})</ItemsTitle>
                <ItemText numberOfLines={2}>
                  {order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
                </ItemText>
              </ItemsContainer>

              <CardInfo>
                <InfoItem>
                  <InfoIcon>
                    <Icon name="event" size={16} color={theme.colors.text.secondary} />
                  </InfoIcon>
                  <InfoText>
                    {formatDate(order.orderDate)}
                    {order.deliveryDate && ` → ${formatDate(order.deliveryDate)}`}
                  </InfoText>
                </InfoItem>
                <CardValue>{formatCurrency(order.value)}</CardValue>
              </CardInfo>

              <CardFooter>
                <ClientText numberOfLines={1}>
                  <Icon name="business" size={14} color={theme.colors.text.secondary} /> {order.client}
                </ClientText>
                <DateText>Criado em {formatDate(order.createdAt)}</DateText>
              </CardFooter>
            </OrderCard>
          ))
        )}
      </Content>
    </Container>
  );
};

export default OrdersScreen;