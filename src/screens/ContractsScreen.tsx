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
import { fetchContracts } from '../store/contractsSlice';
import { theme } from '../styles/theme';
import { Contract } from '../types';
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

const ContractCard = styled(TouchableOpacity)`
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
        case 'active': return theme.colors.success;
        case 'pending': return theme.colors.warning;
        case 'completed': return theme.colors.primary;
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

interface ContractsScreenProps {
  navigation: any;
}

const ContractsScreen: React.FC<ContractsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { contracts, isLoading, error } = useAppSelector(state => state.contracts);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchContracts());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchContracts());
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'pending': return 'Pendente';
      case 'completed': return 'Concluído';
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

  const filteredContracts = contracts.filter(contract => {
    if (filter === 'all') return true;
    return contract.status === filter;
  });

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'completed', label: 'Concluídos' },
  ];

  const handleContractPress = (contract: Contract) => {
    Alert.alert(
      contract.title,
      `Cliente: ${contract.client}\nValor: ${formatCurrency(contract.value)}\nStatus: ${getStatusText(contract.status)}\nInício: ${formatDate(contract.startDate)}\nFim: ${formatDate(contract.endDate)}\n\nDescrição:\n${contract.description}`,
      [{ text: 'OK' }]
    );
  };

  const handleAddContract = () => {
    Alert.alert('Em breve', 'Funcionalidade de adicionar contrato em desenvolvimento');
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Contratos</HeaderTitle>
        <AddButton onPress={handleAddContract}>
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

        {filteredContracts.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Icon name="description" size={40} color={theme.colors.primary} />
            </EmptyIcon>
            <EmptyTitle>Nenhum contrato encontrado</EmptyTitle>
            <EmptyDescription>
              {filter === 'all' 
                ? 'Você ainda não possui contratos cadastrados.\nToque no botão + para adicionar seu primeiro contrato.'
                : `Não há contratos com o status "${filters.find(f => f.key === filter)?.label.toLowerCase()}".`
              }
            </EmptyDescription>
          </EmptyState>
        ) : (
          filteredContracts.map(contract => (
            <ContractCard
              key={contract.id}
              onPress={() => handleContractPress(contract)}
            >
              <CardHeader>
                <CardTitle numberOfLines={2}>{contract.title}</CardTitle>
                <StatusBadge status={contract.status}>
                  <StatusText>{getStatusText(contract.status)}</StatusText>
                </StatusBadge>
              </CardHeader>

              <CardDescription numberOfLines={3}>
                {contract.description}
              </CardDescription>

              <CardInfo>
                <InfoItem>
                  <InfoIcon>
                    <Icon name="event" size={16} color={theme.colors.text.secondary} />
                  </InfoIcon>
                  <InfoText>{formatDate(contract.startDate)} - {formatDate(contract.endDate)}</InfoText>
                </InfoItem>
                <CardValue>{formatCurrency(contract.value)}</CardValue>
              </CardInfo>

              <CardFooter>
                <ClientText numberOfLines={1}>
                  <Icon name="business" size={14} color={theme.colors.text.secondary} /> {contract.client}
                </ClientText>
                <DateText>Criado em {formatDate(contract.createdAt)}</DateText>
              </CardFooter>
            </ContractCard>
          ))
        )}
      </Content>
    </Container>
  );
};

export default ContractsScreen;