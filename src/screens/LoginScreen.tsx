import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/authSlice';
import { ScreenWrapper, LogoSection } from '../components/LayoutComponents';
import { FormInput, FormButton, FormContainer, DemoCredentials } from '../components/FormComponents';



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
    <ScreenWrapper>
      <LogoSection 
        title="Allcom Telecom" 
        subtitle="Gerencie seus contratos e pedidos" 
      />

      <FormContainer>
        <FormInput
          label="E-mail"
          iconName="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          label="Senha"
          iconName="lock"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormButton
          title="Entrar"
          onPress={handleLogin}
          loading={isLoading}
        />

        <DemoCredentials onPress={fillDemoCredentials} />
      </FormContainer>
    </ScreenWrapper>
  );
};

export default LoginScreen;