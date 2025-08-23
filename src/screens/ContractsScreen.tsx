import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContracts } from '../store/contractsSlice';
import { theme } from '../styles/theme';
import { Contract } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { HeaderTitle } from '../components/HeaderTitle';
import { AddButton } from '../components/AddButton';
import { Content } from '../components/Content';
import { FilterButton, FilterButtonText, FilterContainer } from '../components/FiltersCompoents';
import { EmptyDescription, EmptyIcon, EmptyState, EmptyTitle } from '../components/EmptyComponents';
import { ContractCard } from '../components/ContractCard';
import { CardDescription, CardFooter, CardHeader, CardInfo, CardTitle, CardValue } from '../components/CardComponents';
import { StatusBadge, StatusText } from '../components/StatusComponets';
import { InfoIcon, InfoItem, InfoText } from '../components/InfoComponents';
import { ClientText, DateText } from '../components/TextComponents';
import { formatDate, filterContracts, contractFilters } from '../utils';

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

  const filteredContracts = filterContracts(contracts, filter);

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
          {contractFilters.map(filterItem => (
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
              : `Não há contratos com o status "${contractFilters.find(f => f.key === filter)?.label.toLowerCase()}".`
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