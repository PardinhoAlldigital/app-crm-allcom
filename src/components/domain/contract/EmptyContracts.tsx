import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { EmptyDescription, EmptyIcon, EmptyState, EmptyTitle } from '../../ui';
import { theme } from '../../../styles/theme';
import { contractFilters } from '../../../utils';

interface EmptyContractsProps {
  currentFilter: string;
}

export const EmptyContracts: React.FC<EmptyContractsProps> = ({ currentFilter }) => (
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