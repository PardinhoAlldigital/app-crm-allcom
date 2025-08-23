import React from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { logoutUser } from '../store/authSlice';
import { ScreenLayout, Section } from '../components/SectionComponents';
import {
  ProfileAvatar,
  ProfileMenuItem,
  ProfileInfoItem,
  ProfileLogoutButton,
} from '../components/ProfileComponents';



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
    <ScreenLayout>
      <ProfileAvatar
        imageUri={user?.avatar}
        userName={user?.name || 'Usuário'}
        userEmail={user?.email || 'email@exemplo.com'}
      />

      <Section title="Informações Pessoais">
        <ProfileInfoItem
          iconName="person"
          label="Nome Completo"
          value={user?.name || 'Não informado'}
        />
        <ProfileInfoItem
          iconName="email"
          label="E-mail"
          value={user?.email || 'Não informado'}
        />
        <ProfileInfoItem
          iconName="phone"
          label="Telefone"
          value={user?.phone || 'Não informado'}
          isLast={true}
        />
      </Section>

      <Section title="Configurações">
        {menuItems.map((item, index) => (
          <ProfileMenuItem
            key={item.title}
            iconName={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onPress={item.onPress}
            isLast={index === menuItems.length - 1}
          />
        ))}
      </Section>

      <ProfileLogoutButton onPress={handleLogout} />
    </ScreenLayout>
  );
};

export default ProfileScreen;