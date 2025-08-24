import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/authSlice';
import { ScreenWrapper, LogoSection } from '../components/layout/LayoutComponents';
import { FormInput, FormButton, FormContainer, DemoCredentials } from '../components/forms/FormComponents';



interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  const handleLogin = async () => {
    if (!username || !password) { 
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const result = await dispatch(loginUser({ username, password }));
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
    setUsername('demo@allcom.com');
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
          label="Username"
          iconName="email"
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu username"
          keyboardType="default"
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