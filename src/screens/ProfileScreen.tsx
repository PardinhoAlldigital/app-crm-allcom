import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../store/authSlice';
import { theme } from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.backgroundSecondary};
`;

const Header = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  align-items: center;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

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

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg}px;
`;

const SectionContainer = styled(View)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
  ${theme.shadows.sm};
`;

const SectionTitle = styled(Text)`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px;
`;

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

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await dispatch(logoutUser());
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'edit',
      title: 'Editar Perfil',
      subtitle: 'Altere suas informações pessoais',
      onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'notifications',
      title: 'Notificações',
      subtitle: 'Configure suas preferências',
      onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'security',
      title: 'Segurança',
      subtitle: 'Alterar senha e configurações',
      onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'help',
      title: 'Ajuda e Suporte',
      subtitle: 'Central de ajuda e contato',
      onPress: () => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento'),
    },
    {
      icon: 'info',
      title: 'Sobre o App',
      subtitle: 'Versão 1.0.0',
      onPress: () => Alert.alert('AllCom App', 'Versão 1.0.0\nDesenvolvido com React Native'),
    },
  ];

  return (
    <Container>
      <Header>
        <AvatarContainer>
          {user?.avatar ? (
            <Avatar source={{ uri: user.avatar }} />
          ) : (
            <AvatarPlaceholder>
              <Icon name="person" size={40} color={theme.colors.primary} />
            </AvatarPlaceholder>
          )}
        </AvatarContainer>
        <UserName>{user?.name || 'Usuário'}</UserName>
        <UserEmail>{user?.email || 'email@exemplo.com'}</UserEmail>
      </Header>

      <Content>
        <SectionContainer>
          <SectionTitle>Informações Pessoais</SectionTitle>
          
          <InfoItem>
            <InfoIcon>
              <Icon name="person" size={16} color={theme.colors.primary} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Nome Completo</InfoLabel>
              <InfoValue>{user?.name || 'Não informado'}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Icon name="email" size={16} color={theme.colors.primary} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>E-mail</InfoLabel>
              <InfoValue>{user?.email || 'Não informado'}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem style={{ borderBottomWidth: 0 }}>
            <InfoIcon>
              <Icon name="phone" size={16} color={theme.colors.primary} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Telefone</InfoLabel>
              <InfoValue>{user?.phone || 'Não informado'}</InfoValue>
            </InfoContent>
          </InfoItem>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Configurações</SectionTitle>
          
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.title}
              onPress={item.onPress}
              style={index === menuItems.length - 1 ? { borderBottomWidth: 0 } : {}}
            >
              <MenuItemIcon>
                <Icon name={item.icon} size={20} color={theme.colors.primary} />
              </MenuItemIcon>
              <MenuItemContent>
                <MenuItemTitle>{item.title}</MenuItemTitle>
                <MenuItemSubtitle>{item.subtitle}</MenuItemSubtitle>
              </MenuItemContent>
              <MenuItemArrow>
                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
              </MenuItemArrow>
            </MenuItem>
          ))}
        </SectionContainer>

        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Sair da Conta</LogoutButtonText>
        </LogoutButton>
      </Content>
    </Container>
  );
};

export default ProfileScreen;