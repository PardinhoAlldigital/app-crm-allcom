import React, { useState } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../store/authSlice';
import { theme } from '../styles/theme';
import { DrawerParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContractsScreen from '../screens/ContractsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import {
  SideMenuOverlay,
  SideMenuContainer,
  SideMenuContent,
  SideMenuBackdrop,
  NavigationUserSection,
  NavigationMenuItem,
  NavigationLogoutButton,
  NavigationHeaderMenuButton,
} from '../components/NavigationComponents';

const Stack = createStackNavigator<DrawerParamList>();

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
          <NavigationUserSection
            userName={user?.name_user || 'Usuário'}
            userEmail={user?.email_user || 'usuario@exemplo.com'}
          />

          <NavigationMenuItem
            iconName="home"
            title="Início"
            onPress={() => handleMenuPress('Home')}
          />

          <NavigationMenuItem
            iconName="description"
            title="Contratos"
            onPress={() => handleMenuPress('Contracts')}
          />

          <NavigationMenuItem
            iconName="shopping-cart"
            title="Pedidos"
            onPress={() => handleMenuPress('Orders')}
          />

          <NavigationMenuItem
            iconName="person"
            title="Perfil"
            onPress={() => handleMenuPress('Profile')}
          />

          <NavigationLogoutButton onPress={handleLogout} />
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
      <NavigationHeaderMenuButton onPress={onMenuPress} />
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