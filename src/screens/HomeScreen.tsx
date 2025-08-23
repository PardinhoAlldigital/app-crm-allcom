import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContracts } from '../store/contractsSlice';
import { fetchOrders } from '../store/ordersSlice';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.backgroundSecondary};
`;

const Header = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

const WelcomeText = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing.xs}px;
`;

const UserName = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xxl}px;
  font-weight: ${theme.fontWeight.bold};
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg}px;
`;

const SectionTitle = styled(Text)`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
`;

const StatsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

const StatCard = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin: 0 ${theme.spacing.xs}px;
  align-items: center;
  ${theme.shadows.md};
`;

const StatIcon = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const StatNumber = styled(Text)`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const StatLabel = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const QuickActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

const QuickActionCard = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin: 0 ${theme.spacing.xs}px;
  align-items: center;
  ${theme.shadows.sm};
`;

const QuickActionIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.secondary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const QuickActionText = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const RecentItemsContainer = styled(View)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm};
`;

const RecentItemCard = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const RecentItemIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const RecentItemContent = styled(View)`
  flex: 1;
`;

const RecentItemTitle = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const RecentItemSubtitle = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const RecentItemValue = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.primary};
`;

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { contracts, isLoading: contractsLoading } = useAppSelector(state => state.contracts);
  const { orders, isLoading: ordersLoading } = useAppSelector(state => state.orders);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(fetchContracts());
    dispatch(fetchOrders());
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const totalContractValue = contracts.reduce((sum, c) => sum + c.value, 0);
  const totalOrderValue = orders.reduce((sum, o) => sum + o.value, 0);

  const recentItems = [
    ...contracts.slice(0, 2).map(c => ({ ...c, type: 'contract' })),
    ...orders.slice(0, 2).map(o => ({ ...o, type: 'order' }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Container>
      <Header>
        <WelcomeText>Bem-vindo de volta,</WelcomeText>
        <UserName>{user?.name || 'Usuário'}</UserName>
      </Header>

      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SectionTitle>Resumo</SectionTitle>
        <StatsContainer>
          <StatCard onPress={() => navigation.navigate('Contracts')}>
            <StatIcon>
              <Icon name="description" size={24} color={theme.colors.primary} />
            </StatIcon>
            <StatNumber>{activeContracts}</StatNumber>
            <StatLabel>Contratos{"\n"}Ativos</StatLabel>
          </StatCard>

          <StatCard onPress={() => navigation.navigate('Orders')}>
            <StatIcon>
              <Icon name="shopping-cart" size={24} color={theme.colors.primary} />
            </StatIcon>
            <StatNumber>{pendingOrders}</StatNumber>
            <StatLabel>Pedidos{"\n"}Pendentes</StatLabel>
          </StatCard>
        </StatsContainer>

        <SectionTitle>Ações Rápidas</SectionTitle>
        <QuickActionsContainer>
          <QuickActionCard onPress={() => navigation.navigate('Contracts')}>
            <QuickActionIcon>
              <Icon name="add" size={20} color={theme.colors.text.white} />
            </QuickActionIcon>
            <QuickActionText>Novo{"\n"}Contrato</QuickActionText>
          </QuickActionCard>

          <QuickActionCard onPress={() => navigation.navigate('Orders')}>
            <QuickActionIcon>
              <Icon name="add-shopping-cart" size={20} color={theme.colors.text.white} />
            </QuickActionIcon>
            <QuickActionText>Novo{"\n"}Pedido</QuickActionText>
          </QuickActionCard>

          <QuickActionCard onPress={() => navigation.navigate('Profile')}>
            <QuickActionIcon>
              <Icon name="person" size={20} color={theme.colors.text.white} />
            </QuickActionIcon>
            <QuickActionText>Meu{"\n"}Perfil</QuickActionText>
          </QuickActionCard>
        </QuickActionsContainer>

        <SectionTitle>Atividades Recentes</SectionTitle>
        <RecentItemsContainer>
          {recentItems.map((item, index) => (
            <RecentItemCard
              key={`${item.type}-${item.id}`}
              onPress={() => navigation.navigate(item.type === 'contract' ? 'Contracts' : 'Orders')}
              style={index === recentItems.length - 1 ? { borderBottomWidth: 0 } : {}}
            >
              <RecentItemIcon>
                <Icon
                  name={item.type === 'contract' ? 'description' : 'shopping-cart'}
                  size={20}
                  color={theme.colors.primary}
                />
              </RecentItemIcon>
              <RecentItemContent>
                <RecentItemTitle numberOfLines={1}>{item.title}</RecentItemTitle>
                <RecentItemSubtitle>
                  {item.type === 'contract' ? 'Contrato' : 'Pedido'} • {item.client}
                </RecentItemSubtitle>
              </RecentItemContent>
              <RecentItemValue>{formatCurrency(item.value)}</RecentItemValue>
            </RecentItemCard>
          ))}
        </RecentItemsContainer>
      </Content>
    </Container>
  );
};

export default HomeScreen;