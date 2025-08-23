import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

// Screen Container
const ScreenContainer = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${theme.colors.primary};
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const ScreenContent = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  min-height: 100%;
`;

// Logo Components
const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const LogoText = styled(Text)`
  font-size: ${theme.fontSize.xxxl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text.white};
  margin-bottom: ${theme.spacing.sm}px;
`;

const SubtitleText = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.white};
  opacity: 0.8;
  text-align: center;
`;

// Component Interfaces
interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

interface LogoSectionProps {
  title: string;
  subtitle?: string;
}

// Screen Wrapper Component
export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = true,
}) => {
  if (scrollable) {
    return (
      <ScreenContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
          <ScreenContent>
            {children}
          </ScreenContent>
        </ScrollContainer>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScreenContent>
        {children}
      </ScreenContent>
    </ScreenContainer>
  );
};

// Logo Section Component
export const LogoSection: React.FC<LogoSectionProps> = ({ title, subtitle }) => {
  return (
    <LogoContainer>
      <LogoText>{title}</LogoText>
      {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
    </LogoContainer>
  );
};

// Export styled components for direct use if needed
export {
  ScreenContainer,
  ScrollContainer,
  ScreenContent,
  LogoContainer,
  LogoText,
  SubtitleText,
};