import React, { useEffect, useState, useCallback } from 'react';
import {
  RefreshControl,
  Alert,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContracts, resetContracts, setCurrentFilter } from '../store/contractsSlice';
import { theme } from '../styles/theme';
import { Contract } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { HeaderTitle } from '../components/HeaderTitle';
import { AddButton } from '../components/AddButton';
import { FilterButton, FilterButtonText, FilterContainer } from '../components/FiltersCompoents';
import { EmptyDescription, EmptyIcon, EmptyState, EmptyTitle } from '../components/EmptyComponents';
import { ContractCard } from '../components/ContractCard';
import { CardDescription, CardFooter, CardHeader, CardInfo, CardTitle, CardValue } from '../components/CardComponents';
import { StatusBadge, StatusText } from '../components/StatusComponets';
import { InfoIcon, InfoItem, InfoText } from '../components/InfoComponents';
import { ClientText, DateText } from '../components/TextComponents';
import { formatDate, contractFilters } from '../utils';
import { Contracts } from '../types/contractsTypes';
import styled from 'styled-components/native';

const LoadingContainer = styled(View)`
  padding: ${theme.spacing.md}px;
  align-items: center;
`;

interface ContractsScreenProps {
  navigation: any;
}

const ContractsScreen: React.FC<ContractsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { 
    contracts, 
    isLoading, 
    error, 
    hasMore, 
    currentPage, 
    currentFilter 
  } = useAppSelector(state => state.contracts);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(resetContracts());
    dispatch(fetchContracts({ page: 1, type_contract: 'all' }));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(resetContracts());
    dispatch(fetchContracts({ page: 1, type_contract: currentFilter }));
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch, currentFilter]);

  const handleFilterPress = useCallback((filterKey: string) => {
    dispatch(setCurrentFilter(filterKey));
    dispatch(resetContracts());
    dispatch(fetchContracts({ page: 1, type_contract: filterKey }));
  }, [dispatch]);

  const loadMoreContracts = useCallback(() => {
    if (hasMore && !isLoading && !loadingMore) {
      setLoadingMore(true);
      dispatch(fetchContracts({ 
        page: currentPage + 1, 
        type_contract: currentFilter, 
        loadMore: true 
      })).finally(() => setLoadingMore(false));
    }
  }, [dispatch, hasMore, isLoading, loadingMore, currentPage, currentFilter]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'Aprovado';
      case 'Pendente': return 'Pendente';
      case 'Recusado': return 'Recusado';
      case 'Reprovado': return 'Reprovado';
      case 'Desativado': return 'Desativado';
      case 'Ativo': return 'Ativo';
      default: return status;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleContractPress = (contract: Contracts) => {
    Alert.alert(
      contract.brand_name + ' - ' + contract.model_name,
      `Cliente: ${contract.client.name_account}\nValor: ${formatCurrency(contract.price)}\nStatus: ${getStatusText(contract.status_contract)}`,
      [{ text: 'OK' }]
    );
  };

  const handleAddContract = () => {
    Alert.alert('Em breve', 'Funcionalidade de adicionar contrato em desenvolvimento');
  };

  const renderContract = ({ item }: { item: Contracts }) => (
    <ContractCard
      key={item.id_contract}
      onPress={() => handleContractPress(item)}
    >
      <CardHeader>
        <CardTitle numberOfLines={2}>{"#" + item.id_contract + " - " + (item.operators ?? (item.brand_name + ' - ' + (item.franchiese ?? item.model_name)))}</CardTitle>
        <StatusBadge status={item.status_contract}>
          <StatusText>{getStatusText(item.status_contract)}</StatusText>
        </StatusBadge>
      </CardHeader>

      <CardDescription numberOfLines={1}>
        Tipo de contrato: {item.type_contract}
      </CardDescription>
      <CardDescription numberOfLines={1}>
        Vendedor: {item.vendor_contract}
      </CardDescription>

      <CardInfo>
        <InfoItem>
          <InfoIcon>
            <Icon name="event" size={16} color={theme.colors.text.secondary} />
          </InfoIcon>
          <InfoText>{formatDate(item.date_client_approved)}</InfoText>
        </InfoItem>
        <CardValue>{formatCurrency((item.monthly_payment ?? item.price))}</CardValue>
      </CardInfo>

      <CardFooter>
        <ClientText numberOfLines={1}>
          <Icon name="business" size={14} color={theme.colors.text.secondary} /> {'lucas pardinho'}
        </ClientText>
        <DateText>Criado em {formatDate(item.created_at)}</DateText>
      </CardFooter>
    </ContractCard>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </LoadingContainer>
    );
  };

  const renderEmpty = () => (
    <EmptyState>
      <EmptyIcon>
        <Icon name="description" size={40} color={theme.colors.primary} />
      </EmptyIcon>
      <EmptyTitle>Nenhum contrato encontrado</EmptyTitle>
      <EmptyDescription>
        {currentFilter === 'all' 
        ? 'Você ainda não possui contratos cadastrados.\nToque no botão + para adicionar seu primeiro contrato.'
        : `Não há contratos do tipo "${contractFilters.find(f => f.key === currentFilter)?.label}".`
      }
      </EmptyDescription>
    </EmptyState>
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Contratos</HeaderTitle>
        <AddButton onPress={handleAddContract}>
          <Icon name="add" size={24} color={theme.colors.text.white} />
        </AddButton>
      </Header>

      <FilterContainer>
        {contractFilters.map(filterItem => (
          <FilterButton
            key={filterItem.key}
            active={currentFilter === filterItem.key}
            onPress={() => handleFilterPress(filterItem.key)}
          >
            <FilterButtonText active={currentFilter === filterItem.key}>
              {filterItem.label}
            </FilterButtonText>
          </FilterButton>
        ))}
      </FilterContainer>

      <FlatList
        data={contracts}
        renderItem={renderContract}
        keyExtractor={(item) => item.id_contract.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreContracts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default ContractsScreen;