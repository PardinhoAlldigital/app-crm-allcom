import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../store/authSlice';
import { theme } from '../styles/theme';
import { DrawerParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContractsScreen from '../screens/ContractsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator<DrawerParamList>();
const { width } = Dimensions.get('window');

const SideMenuOverlay = styled(Modal)``;

const SideMenuContainer = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const SideMenuContent = styled(View)`
  width: ${width * 0.75}px;
  background-color: ${theme.colors.background};
  padding: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const SideMenuBackdrop = styled(TouchableOpacity)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const UserSection = styled(View)`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
  margin-bottom: 20px;
`;

const UserName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 5px;
`;

const UserEmail = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const MenuItemText = styled(Text)`
  margin-left: 15px;
  font-size: 16px;
  color: ${theme.colors.text.primary};
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  margin-top: 20px;
`;

const LogoutText = styled(Text)`
  margin-left: 15px;
  font-size: 16px;
  color: ${theme.colors.error};
`;

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: keyof DrawerParamList) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onNavigate }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            dispatch(logoutUser());
            onClose();
          },
        },
      ]
    );
  };

  const handleMenuPress = (screen: keyof DrawerParamList) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <SideMenuOverlay
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SideMenuContainer>
        <SideMenuContent>
          <UserSection>
            <UserName>{user?.name || 'Usuário'}</UserName>
            <UserEmail>{user?.email || 'usuario@exemplo.com'}</UserEmail>
          </UserSection>

          <MenuItem onPress={() => handleMenuPress('Home')}>
            <Icon name="home" size={24} color={theme.colors.primary} />
            <MenuItemText>Início</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleMenuPress('Contracts')}>
            <Icon name="description" size={24} color={theme.colors.primary} />
            <MenuItemText>Contratos</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleMenuPress('Orders')}>
            <Icon name="shopping-cart" size={24} color={theme.colors.primary} />
            <MenuItemText>Pedidos</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleMenuPress('Profile')}>
            <Icon name="person" size={24} color={theme.colors.primary} />
            <MenuItemText>Perfil</MenuItemText>
          </MenuItem>

          <LogoutButton onPress={handleLogout}>
            <Icon name="logout" size={24} color={theme.colors.error} />
            <LogoutText>Sair</LogoutText>
          </LogoutButton>
        </SideMenuContent>
        <SideMenuBackdrop onPress={onClose} />
      </SideMenuContainer>
    </SideMenuOverlay>
  );
};

interface MainNavigatorProps {
  currentScreen: keyof DrawerParamList;
  onMenuPress: () => void;
}

const MainNavigator: React.FC<MainNavigatorProps> = ({ currentScreen, onMenuPress }) => {
  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.background,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
    },
    headerLeft: () => (
      <TouchableOpacity onPress={onMenuPress} style={{ marginLeft: 15 }}>
        <Icon name="menu" size={24} color={theme.colors.background} />
      </TouchableOpacity>
    ),
  };

  const getScreenTitle = (screen: keyof DrawerParamList) => {
    switch (screen) {
      case 'Home': return 'CRM Allcom';
      case 'Contracts': return 'Contratos';
      case 'Orders': return 'Pedidos';
      case 'Profile': return 'Perfil';
      default: return 'CRM Allcom';
    }
  };

  const renderScreen = () => {
    const mockNavigation = { navigate: () => {}, goBack: () => {} } as any;
    switch (currentScreen) {
      case 'Contracts': return <ContractsScreen navigation={mockNavigation} />;
      case 'Orders': return <OrdersScreen navigation={mockNavigation} />;
      case 'Profile': return <ProfileScreen navigation={mockNavigation} />;
      default: return <HomeScreen navigation={mockNavigation} />;
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerTitle: getScreenTitle(currentScreen),
      }}
    >
      <Stack.Screen name={currentScreen} component={() => renderScreen()} />
    </Stack.Navigator>
  );
};

const DrawerNavigator: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<keyof DrawerParamList>('Home');

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleNavigate = (screen: keyof DrawerParamList) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      <MainNavigator currentScreen={currentScreen} onMenuPress={handleMenuPress} />
      <SideMenu
        visible={menuVisible}
        onClose={handleMenuClose}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default DrawerNavigator;