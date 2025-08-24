import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../styles/theme';

const LoadingContainer = styled(View)`
  padding: ${theme.spacing.md}px;
  align-items: center;
`;

interface LoadingFooterProps {
  isLoading: boolean;
}

export const LoadingFooter: React.FC<LoadingFooterProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <LoadingContainer>
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </LoadingContainer>
  );
};