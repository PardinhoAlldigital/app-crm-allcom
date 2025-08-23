import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/authSlice';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${theme.colors.primary};
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  min-height: 100%;
`;

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

const LoginButton = styled(TouchableOpacity)<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? theme.colors.border : theme.colors.primary};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
  shadow-color: ${theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const LoginButtonText = styled(Text)<{ disabled?: boolean }>`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
`;

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

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigation.replace('Main');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer login');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('demo@allcom.com');
    setPassword('123456');
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
        <Content>
          <LogoContainer>
            <LogoText>AllCom</LogoText>
            <SubtitleText>Gerencie seus contratos e pedidos</SubtitleText>
          </LogoContainer>

          <FormContainer>
            <InputContainer>
              <InputLabel>E-mail</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Icon name="email" size={20} color={theme.colors.text.secondary} />
                </InputIcon>
                <StyledTextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={theme.colors.text.light}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </InputWrapper>
            </InputContainer>

            <InputContainer>
              <InputLabel>Senha</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Icon name="lock" size={20} color={theme.colors.text.secondary} />
                </InputIcon>
                <StyledTextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor={theme.colors.text.light}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </InputWrapper>
            </InputContainer>

            <LoginButton onPress={handleLogin} disabled={isLoading}>
              <LoginButtonText disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </LoginButtonText>
            </LoginButton>

            <TouchableOpacity onPress={fillDemoCredentials}>
              <DemoContainer>
                <DemoText>
                  💡 Demo: Toque aqui para preencher credenciais de teste{"\n"}
                  E-mail: demo@allcom.com | Senha: 123456
                </DemoText>
              </DemoContainer>
            </TouchableOpacity>
          </FormContainer>
        </Content>
      </ScrollContainer>
    </Container>
  );
};

export default LoginScreen;