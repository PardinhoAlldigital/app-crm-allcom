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

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.backgroundSecondary};
`;

const Header = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

const HeaderTitle = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
`;

const AddButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg}px;
`;

const FilterContainer = styled(View)`
  flex-direction: row;
  margin-bottom: ${theme.spacing.lg}px;
`;

const FilterButton = styled(TouchableOpacity)<{ active: boolean }>`
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.background};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.full}px;
  margin-right: ${theme.spacing.sm}px;
  ${theme.shadows.sm};
`;

const FilterButtonText = styled(Text)<{ active: boolean }>`
  color: ${props => props.active ? theme.colors.text.white : theme.colors.text.primary};
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
`;

const OrderCard = styled(TouchableOpacity)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.md};
`;

const CardHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md}px;
`;

const CardTitle = styled(Text)`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: ${theme.spacing.sm}px;
`;

const StatusBadge = styled(View)<{ status: string }>`
  background-color: ${
    props => {
      switch (props.status) {
        case 'delivered': return theme.colors.success;
        case 'shipped': return theme.colors.primary;
        case 'processing': return theme.colors.warning;
        case 'pending': return theme.colors.secondary;
        case 'cancelled': return theme.colors.error;
        default: return theme.colors.text.secondary;
      }
    }
  };
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
`;

const StatusText = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xs}px;
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
`;

const CardDescription = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: ${theme.spacing.md}px;
`;

const CardInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const InfoIcon = styled(View)`
  margin-right: ${theme.spacing.xs}px;
`;

const InfoText = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const CardValue = styled(Text)`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  text-align: right;
`;

const ItemsContainer = styled(View)`
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const ItemsTitle = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ItemText = styled(Text)`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  line-height: 16px;
`;

const CardFooter = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md}px;
  padding-top: ${theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

const ClientText = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

const DateText = styled(Text)`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.light};
`;

const EmptyState = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl}px;
`;

const EmptyIcon = styled(View)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const EmptyTitle = styled(Text)`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const EmptyDescription = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
`;

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'processing', label: 'Processando' },
    { key: 'shipped', label: 'Enviados' },
    { key: 'delivered', label: 'Entregues' },
  ];

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
          {filters.map(filterItem => (
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
                : `Não há pedidos com o status "${filters.find(f => f.key === filter)?.label.toLowerCase()}".`
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
                <StatusBadge status={order.status}>
                  <StatusText>{getStatusText(order.status)}</StatusText>
                </StatusBadge>
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