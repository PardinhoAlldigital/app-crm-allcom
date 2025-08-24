import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  TouchableOpacityProps,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles/theme';

// Input Components
const InputContainer = styled(View)`
  margin-bottom: ${theme.spacing.lg}px;
`;

const InputLabel = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.backgroundSecondary};
`;

const InputIcon = styled(View)`
  padding: ${theme.spacing.md}px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

// Button Components
const StyledButton = styled(TouchableOpacity)<{ disabled?: boolean; variant?: 'primary' | 'secondary' }>`
  background-color: ${props => {
    if (props.disabled) return theme.colors.border;
    return props.variant === 'secondary' ? theme.colors.backgroundSecondary : theme.colors.primary;
  }};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
  shadow-color: ${props => props.variant === 'secondary' ? theme.colors.shadow : theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const ButtonText = styled(Text)<{ disabled?: boolean; variant?: 'primary' | 'secondary' }>`
  color: ${props => {
    if (props.variant === 'secondary') return theme.colors.text.primary;
    return theme.colors.text.white;
  }};
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
`;

// Form Container
const FormContainer = styled(View)`
  width: 100%;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl}px;
  padding: ${theme.spacing.xl}px;
  shadow-color: ${theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

// Component Interfaces
interface FormInputProps extends TextInputProps {
  label: string;
  iconName?: string;
  error?: string;
}

interface FormButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

// Form Input Component
export const FormInput: React.FC<FormInputProps> = ({
  label,
  iconName,
  error,
  ...textInputProps
}) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        {iconName && (
          <InputIcon>
            <Icon name={iconName} size={20} color={theme.colors.text.secondary} />
          </InputIcon>
        )}
        <StyledTextInput
          placeholderTextColor={theme.colors.text.light}
          {...textInputProps}
        />
      </InputWrapper>
      {error && (
        <Text style={{ color: theme.colors.error, fontSize: theme.fontSize.sm, marginTop: theme.spacing.xs }}>
          {error}
        </Text>
      )}
    </InputContainer>
  );
};

// Form Button Component
export const FormButton: React.FC<FormButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  ...touchableOpacityProps
}) => {
  return (
    <StyledButton
      disabled={disabled || loading}
      variant={variant}
      {...touchableOpacityProps}
    >
      <ButtonText disabled={disabled || loading} variant={variant}>
        {loading ? 'Carregando...' : title}
      </ButtonText>
    </StyledButton>
  );
};

// Form Container Component
export { FormContainer };

// Demo Container for Login
const DemoContainer = styled(View)`
  margin-top: ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.primaryLight};
  border-radius: ${theme.borderRadius.md}px;
  opacity: 0.9;
`;

const DemoText = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.sm}px;
  text-align: center;
  line-height: 20px;
`;

interface DemoCredentialsProps {
  onPress: () => void;
}

export const DemoCredentials: React.FC<DemoCredentialsProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <DemoContainer>
        <DemoText>
          💡 Demo: Toque aqui para preencher credenciais de teste{"\n"}
          E-mail: demo@allcom.com | Senha: 123456
        </DemoText>
      </DemoContainer>
    </TouchableOpacity>
  );
};