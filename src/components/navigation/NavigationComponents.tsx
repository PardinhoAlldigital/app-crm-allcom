import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles/theme';

const { width } = Dimensions.get('window');

// Side Menu Styled Components
export const SideMenuOverlay = styled(Modal)``;

export const SideMenuContainer = styled(View)`
  flex: 1;
  flex-direction: row;
`;

export const SideMenuContent = styled(View)`
  width: ${width * 0.75}px;
  background-color: ${theme.colors.background};
  padding: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const SideMenuBackdrop = styled(TouchableOpacity)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

// User Section Styled Components
export const UserSection = styled(View)`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
  margin-bottom: 20px;
`;

export const UserName = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin-bottom: 5px;
`;

export const UserEmail = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

// Menu Item Styled Components
export const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

export const MenuItemText = styled(Text)`
  margin-left: 15px;
  font-size: 16px;
  color: ${theme.colors.text.primary};
`;

// Logout Button Styled Components
export const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  margin-top: 20px;
`;

export const LogoutText = styled(Text)`
  margin-left: 15px;
  font-size: 16px;
  color: ${theme.colors.error};
`;

// Header Button Styled Component
export const HeaderMenuButton = styled(TouchableOpacity)`
  margin-left: 15px;
`;

// Component Interfaces
interface UserSectionProps {
  userName: string;
  userEmail: string;
}

interface NavigationMenuItemProps extends TouchableOpacityProps {
  iconName: string;
  title: string;
  isLast?: boolean;
}

interface NavigationLogoutButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

interface HeaderMenuButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}

// Reusable Components
export const NavigationUserSection: React.FC<UserSectionProps> = ({
  userName,
  userEmail,
}) => (
  <UserSection>
    <UserName>{userName}</UserName>
    <UserEmail>{userEmail}</UserEmail>
  </UserSection>
);

export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  iconName,
  title,
  isLast = false,
  ...props
}) => (
  <MenuItem {...props}>
    <Icon name={iconName} size={24} color={theme.colors.primary} />
    <MenuItemText>{title}</MenuItemText>
  </MenuItem>
);

export const NavigationLogoutButton: React.FC<NavigationLogoutButtonProps> = ({
  onPress,
  ...props
}) => (
  <LogoutButton onPress={onPress} {...props}>
    <Icon name="logout" size={24} color={theme.colors.error} />
    <LogoutText>Sair</LogoutText>
  </LogoutButton>
);

export const NavigationHeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({
  onPress,
  ...props
}) => (
  <HeaderMenuButton onPress={onPress} {...props}>
    <Icon name="menu" size={24} color={theme.colors.background} />
  </HeaderMenuButton>
);