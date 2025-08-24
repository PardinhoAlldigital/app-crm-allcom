import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContracts } from '../store/contractsSlice';
import { fetchOrders } from '../store/ordersSlice';
import { ScreenLayout, Section, StatsContainer, QuickActionsContainer, ContentContainer } from '../components/layout/SectionComponents';
import { StatCard, QuickActionCard, RecentItemCard } from '../components/ui/CardComponents';
import { formatCurrency } from '../utils';



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
    dispatch(fetchContracts({}));
    dispatch(fetchOrders());
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const activeContracts = (contracts || []).filter(c => c.status_contract === 'Aprovado').length;
  const pendingOrders = (orders || []).filter(o => o.status === 'pending' || o.status === 'processing').length;

  const recentItems = [
    ...(contracts || []).slice(0, 2).map(c => ({ 
      ...c, 
      type: 'contract' as const,
      title: c.brand_name || `Contrato ${c.type_contract}`,
      client: c.client?.name_account || 'Cliente não informado',
      value: c.total_amounth || 0,
      created_at: c.created_at_contract,
      id: c.id_contract.toString()
    })),
    ...(orders || []).slice(0, 2).map(o => ({ 
      ...o, 
      type: 'order' as const,
      created_at: o.createdAt
    }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);



  return (
    <ScreenLayout
      showHeader={true}
      headerProps={{
        welcomeText: "Bem-vindo de volta,",
        userName: user?.name_user || 'Usuário'
      }}
    >
      <ContentContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Section title="Resumo">
          <StatsContainer>
            <StatCard
              iconName="description"
              number={activeContracts.toString()}
              label={`Contratos\nPendentes de Aprovação`}
              onPress={() => navigation.navigate('Contracts')}
            />
            <StatCard
              iconName="shopping-cart"
              number={pendingOrders.toString()}
              label={`Pedidos\nPendentes de Aprovação`}
              onPress={() => navigation.navigate('Orders')}
            />
          </StatsContainer>
        </Section>

        <Section title="Ações Rápidas">
          <QuickActionsContainer>
            <QuickActionCard
              iconName="add"
              text={`Novo\nContrato`}
              onPress={() => navigation.navigate('Contracts')}
            />
            <QuickActionCard
              iconName="add-shopping-cart"
              text={`Novo\nPedido`}
              onPress={() => navigation.navigate('Orders')}
            />
          </QuickActionsContainer>
        </Section>

        <Section title="Atividades Recentes">
          {recentItems.map((item, index) => (
            <RecentItemCard
              key={`${item.type}-${item.id}-${index}`}
              iconName={item.type === 'contract' ? 'description' : 'shopping-cart'}
              title={item.title}
              subtitle={`${item.type === 'contract' ? 'Contrato' : 'Pedido'} • ${item.client}`}
              value={formatCurrency(item.value)}
              isLast={index === recentItems.length - 1}
              onPress={() => navigation.navigate(item.type === 'contract' ? 'Contracts' : 'Orders')}
            />
          ))}
        </Section>
      </ContentContainer>
    </ScreenLayout>
  );
};

export default HomeScreen;