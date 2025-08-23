import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

// Section Components
const SectionContainer = styled(View)`
  margin-bottom: ${theme.spacing.lg}px;
  min-width: 300px;
`;

const SectionTitle = styled(Text)`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
`;

const SectionContent = styled(View)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  ${theme.shadows.sm};
`;

// Stats Container
const StatsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

// Quick Actions Container
const QuickActionsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

// Header Components
const HeaderContainer = styled(View)`
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

// Content Container
const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.md}px;
`;

// Screen Container
const ScreenContainer = styled(View)`
  flex: 1;
  background-color: ${theme.colors.backgroundSecondary};
`;

// Component Interfaces
interface SectionProps {
  title: string;
  children: React.ReactNode;
  showBackground?: boolean;
}

interface HeaderProps {
  welcomeText?: string;
  userName?: string;
}

interface ScreenLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerProps?: HeaderProps;
}

// Section Component
export const Section: React.FC<SectionProps> = ({
  title,
  children,
  showBackground = true,
}) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {showBackground ? (
        <SectionContent>{children}</SectionContent>
      ) : (
        <View>{children}</View>
      )}
    </SectionContainer>
  );
};

// Header Component
export const Header: React.FC<HeaderProps> = ({
  welcomeText = "Bem-vindo",
  userName = "Usuário",
}) => {
  return (
    <HeaderContainer>
      <WelcomeText>{welcomeText}</WelcomeText>
      <UserName>{userName}</UserName>
    </HeaderContainer>
  );
};

// Screen Layout Component
export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showHeader = false,
  headerProps,
}) => {
  return (
    <ScreenContainer>
      {showHeader && <Header {...headerProps} />}
      <ContentContainer showsVerticalScrollIndicator={false}>
        {children}
      </ContentContainer>
    </ScreenContainer>
  );
};

// Export styled components for direct use if needed
export {
  SectionContainer,
  SectionTitle,
  SectionContent,
  StatsContainer,
  QuickActionsContainer,
  HeaderContainer,
  WelcomeText,
  UserName,
  ContentContainer,
  ScreenContainer,
};