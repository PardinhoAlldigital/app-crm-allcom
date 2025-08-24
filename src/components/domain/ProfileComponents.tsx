import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../../styles/theme';

// Avatar Components
const AvatarContainer = styled(View)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.lg};
`;

const Avatar = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

const AvatarPlaceholder = styled(View)`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
`;

const UserName = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.xs}px;
`;

const UserEmail = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.md}px;
  opacity: 0.9;
`;

// Profile Header Components
const ProfileHeaderContainer = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  align-items: center;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

// Menu Item Components
const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const MenuItemIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const MenuItemContent = styled(View)`
  flex: 1;
`;

const MenuItemTitle = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const MenuItemSubtitle = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const MenuItemArrow = styled(View)`
  margin-left: ${theme.spacing.sm}px;
`;

// Info Item Components
const InfoItem = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const InfoIcon = styled(View)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const InfoContent = styled(View)`
  flex: 1;
`;

const InfoLabel = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const InfoValue = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
`;

// Logout Button Components
const LogoutButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.error};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  align-items: center;
  margin: ${theme.spacing.lg}px 0;
  ${theme.shadows.sm};
`;

const LogoutButtonText = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.md}px;
  font-weight: ${theme.fontWeight.semibold};
`;

// Interfaces
interface ProfileAvatarProps {
  imageUri?: string;
  userName: string;
  userEmail: string;
}

interface ProfileMenuItemProps extends TouchableOpacityProps {
  iconName: string;
  title: string;
  subtitle?: string;
  showArrow?: boolean;
  isLast?: boolean;
}

interface ProfileInfoItemProps {
  iconName: string;
  label: string;
  value: string;
  isLast?: boolean;
}

interface ProfileLogoutButtonProps extends TouchableOpacityProps {
  text?: string;
}

// Components
export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imageUri,
  userName,
  userEmail,
}) => {
  return (
    <ProfileHeaderContainer>
      <AvatarContainer>
        {imageUri ? (
          <Avatar source={{ uri: imageUri }} />
        ) : (
          <AvatarPlaceholder>
            <Icon name="person" size={40} color={theme.colors.primary} />
          </AvatarPlaceholder>
        )}
      </AvatarContainer>
      <UserName>{userName}</UserName>
      <UserEmail>{userEmail}</UserEmail>
    </ProfileHeaderContainer>
  );
};

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  iconName,
  title,
  subtitle,
  showArrow = true,
  isLast = false,
  ...touchableOpacityProps
}) => {
  return (
    <MenuItem
      {...touchableOpacityProps}
      style={isLast ? { borderBottomWidth: 0 } : {}}
    >
      <MenuItemIcon>
        <Icon name={iconName} size={20} color={theme.colors.primary} />
      </MenuItemIcon>
      <MenuItemContent>
        <MenuItemTitle>{title}</MenuItemTitle>
        {subtitle && <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>}
      </MenuItemContent>
      {showArrow && (
        <MenuItemArrow>
          <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
        </MenuItemArrow>
      )}
    </MenuItem>
  );
};

export const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({
  iconName,
  label,
  value,
  isLast = false,
}) => {
  return (
    <InfoItem style={isLast ? { borderBottomWidth: 0 } : {}}>
      <InfoIcon>
        <Icon name={iconName} size={16} color={theme.colors.primary} />
      </InfoIcon>
      <InfoContent>
        <InfoLabel>{label}</InfoLabel>
        <InfoValue>{value}</InfoValue>
      </InfoContent>
    </InfoItem>
  );
};

export const ProfileLogoutButton: React.FC<ProfileLogoutButtonProps> = ({
  text = "Sair da Conta",
  ...touchableOpacityProps
}) => {
  return (
    <LogoutButton {...touchableOpacityProps}>
      <LogoutButtonText>{text}</LogoutButtonText>
    </LogoutButton>
  );
};

// Export styled components for direct use if needed
export {
  ProfileHeaderContainer,
  AvatarContainer,
  Avatar,
  AvatarPlaceholder,
  UserName,
  UserEmail,
  MenuItem,
  MenuItemIcon,
  MenuItemContent,
  MenuItemTitle,
  MenuItemSubtitle,
  MenuItemArrow,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  LogoutButton,
  LogoutButtonText,
};