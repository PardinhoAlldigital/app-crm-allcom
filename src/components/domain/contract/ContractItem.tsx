import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ContractCard } from './ContractCard';
import { Contracts } from '../../../types/contractsTypes';
import { formatCurrency, formatDate } from '../../../utils';
import { CardDescription, CardFooter, CardHeader, CardInfo, CardTitle, CardValue, ClientText, DateText, InfoText, StatusBadge, StatusText } from '../../ui';
import { InfoIcon, InfoItem } from '../ProfileComponents';
import { theme } from '../../../styles/theme';

interface ContractItemProps {
  item: Contracts;
}

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

const handleContractPress = (contract: Contracts) => {
  Alert.alert(
    contract.brand_name + ' - ' + contract.model_name,
    `Cliente: ${contract.client.name_account}\nValor: ${formatCurrency(contract.price)}\nStatus: ${getStatusText(contract.status_contract)}`,
    [{ text: 'OK' }]
  );
};

export const ContractItem: React.FC<ContractItemProps> = ({ item }) => (
  <ContractCard
    key={item.id_contract}
    onPress={() => handleContractPress(item)}
  >
    <CardHeader>
      <CardTitle numberOfLines={2}>
        {"#" + item.id_contract + " - " + (item.operators ?? (item.brand_name + ' - ' + (item.franchiese ?? item.model_name)))}
      </CardTitle>
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