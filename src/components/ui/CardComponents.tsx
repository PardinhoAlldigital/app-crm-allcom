import React from 'react';
import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../styles/theme";
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const OrderCard = styled(TouchableOpacity)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.md};
`;

// Stat Card Components
const StatCardContainer = styled(TouchableOpacity)`
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

// Quick Action Card Components
const QuickActionCardContainer = styled(TouchableOpacity)`
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

// Recent Item Card Components
const RecentItemCardContainer = styled(TouchableOpacity)`
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

// Component Interfaces
interface StatCardProps extends TouchableOpacityProps {
  iconName: string;
  number: string | number;
  label: string;
}

interface QuickActionCardProps extends TouchableOpacityProps {
  iconName: string;
  text: string;
}

interface RecentItemCardProps extends TouchableOpacityProps {
  iconName: string;
  title: string;
  subtitle: string;
  value?: string;
  isLast?: boolean;
}

// Stat Card Component
export const StatCard: React.FC<StatCardProps> = ({
  iconName,
  number,
  label,
  ...touchableOpacityProps
}) => {
  return (
    <StatCardContainer {...touchableOpacityProps}>
      <StatIcon>
        <Icon name={iconName} size={24} color={theme.colors.primary} />
      </StatIcon>
      <StatNumber>{number}</StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCardContainer>
  );
};

// Quick Action Card Component
export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  iconName,
  text,
  ...touchableOpacityProps
}) => {
  return (
    <QuickActionCardContainer {...touchableOpacityProps}>
      <QuickActionIcon>
        <Icon name={iconName} size={20} color={theme.colors.text.white} />
      </QuickActionIcon>
      <QuickActionText>{text}</QuickActionText>
    </QuickActionCardContainer>
  );
};

// Recent Item Card Component
export const RecentItemCard: React.FC<RecentItemCardProps> = ({
  iconName,
  title,
  subtitle,
  value,
  isLast = false,
  ...touchableOpacityProps
}) => {
  return (
    <RecentItemCardContainer
      style={isLast ? { borderBottomWidth: 0 } : {}}
      {...touchableOpacityProps}
    >
      <RecentItemIcon>
        <Icon name={iconName} size={20} color={theme.colors.primary} />
      </RecentItemIcon>
      <RecentItemContent>
        <RecentItemTitle>{title}</RecentItemTitle>
        <RecentItemSubtitle>{subtitle}</RecentItemSubtitle>
      </RecentItemContent>
      {value && <RecentItemValue>{value}</RecentItemValue>}
    </RecentItemCardContainer>
  );
};

export {CardHeader, CardTitle, CardDescription, CardInfo, CardValue, CardFooter, OrderCard}
