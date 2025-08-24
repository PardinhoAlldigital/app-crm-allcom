import React, { useEffect, useState, useCallback } from 'react';
import {
  RefreshControl,
  FlatList,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchContracts, resetContracts, setCurrentFilter } from '../store/contractsSlice';
import { theme } from '../styles/theme';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { HeaderTitle } from '../components/layout/HeaderTitle';
import { FilterButton, FilterButtonText, FilterContainer } from '../components/ui/FiltersCompoents';
import { ContractItem } from '../components/domain/contract/ContractItem';
import { LoadingFooter } from '../components/domain/contract/LoadingFooter';
import { EmptyContracts } from '../components/domain/contract/EmptyContracts';
import { contractFilters } from '../utils';
import { Contracts } from '../types/contractsTypes';

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

  const renderContract = ({ item }: { item: Contracts }) => (
    <ContractItem item={item} />
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Contratos</HeaderTitle>
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
        ListFooterComponent={<LoadingFooter isLoading={loadingMore} />}
        ListEmptyComponent={!isLoading ? <EmptyContracts currentFilter={currentFilter} /> : null}
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