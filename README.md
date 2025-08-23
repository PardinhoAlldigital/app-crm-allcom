# AllcomApp 📱

Um aplicativo React Native moderno para gerenciamento de contratos e pedidos, desenvolvido com TypeScript e um design elegante em tema roxo.

## 🚀 Sobre o Projeto

O AllcomApp é uma aplicação mobile completa que permite aos usuários:
- Fazer login e gerenciar perfil
- Visualizar dashboard com estatísticas
- Gerenciar contratos com filtros e busca
- Acompanhar pedidos em tempo real
- Navegar através de um menu lateral intuitivo

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native** - Framework para desenvolvimento mobile
- **TypeScript** - Tipagem estática para JavaScript
- **Expo** - Plataforma de desenvolvimento e build

### Gerenciamento de Estado
- **Redux Toolkit** - Gerenciamento de estado global
- **React Redux** - Integração do Redux com React

### Navegação
- **React Navigation** - Navegação entre telas
- **Stack Navigator** - Navegação em pilha
- **Menu lateral customizado** - Implementação própria com Modal

### Estilização
- **Styled Components** - CSS-in-JS para estilização
- **Tema customizado** - Sistema de design consistente
- **React Native Vector Icons** - Ícones Material Design

### Utilitários
- **Axios** - Cliente HTTP para requisições
- **AsyncStorage** - Armazenamento local persistente

## 📁 Estrutura do Projeto

```
AllcomApp/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── navigation/          # Configuração de navegação
│   │   ├── AppNavigator.tsx # Navegador principal
│   │   └── DrawerNavigator.tsx # Menu lateral
│   ├── screens/             # Telas do aplicativo
│   │   ├── LoginScreen.tsx  # Tela de login
│   │   ├── HomeScreen.tsx   # Dashboard principal
│   │   ├── ProfileScreen.tsx # Perfil do usuário
│   │   ├── ContractsScreen.tsx # Gerenciamento de contratos
│   │   └── OrdersScreen.tsx # Acompanhamento de pedidos
│   ├── store/               # Redux store e slices
│   │   ├── index.ts         # Configuração da store
│   │   ├── authSlice.ts     # Estado de autenticação
│   │   ├── contractsSlice.ts # Estado dos contratos
│   │   └── ordersSlice.ts   # Estado dos pedidos
│   ├── services/            # Serviços e APIs
│   │   ├── api.ts           # Configuração do Axios
│   │   ├── authService.ts   # Serviços de autenticação
│   │   ├── contractsService.ts # Serviços de contratos
│   │   └── ordersService.ts # Serviços de pedidos
│   ├── styles/              # Tema e estilos globais
│   │   └── theme.ts         # Sistema de design
│   ├── types/               # Definições de tipos TypeScript
│   │   └── index.ts         # Tipos globais
│   └── utils/               # Utilitários e helpers
├── assets/                  # Imagens e recursos
├── App.tsx                  # Componente raiz
└── package.json             # Dependências e scripts
```

## 🎨 Design System

### Paleta de Cores
- **Primário**: `#8B5CF6` (Roxo principal)
- **Primário Escuro**: `#7C3AED`
- **Primário Claro**: `#A78BFA`
- **Secundário**: `#EC4899` (Rosa complementar)
- **Background**: `#FFFFFF`
- **Texto**: `#1F2937`
- **Sucesso**: `#10B981`
- **Erro**: `#EF4444`

### Tipografia
- **Tamanhos**: 12px a 32px
- **Pesos**: Normal (400) a Bold (700)
- **Fonte**: Sistema padrão

### Espaçamento
- **Sistema**: 4px, 8px, 16px, 24px, 32px, 48px
- **Border Radius**: 4px a 16px

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (para teste em dispositivo)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd AllcomApp
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npx expo start
```

4. **Teste no dispositivo**
- Escaneie o QR code com o app Expo Go
- Ou pressione `w` para abrir no navegador
- Ou pressione `i` para iOS Simulator
- Ou pressione `a` para Android Emulator

## 📱 Funcionalidades

### 🔐 Autenticação
- Login com email e senha
- Validação de formulários
- Persistência de sessão
- Logout seguro

### 🏠 Dashboard (Home)
- Estatísticas resumidas
- Ações rápidas
- Atividades recentes
- Cards informativos

### 📋 Contratos
- Listagem de contratos
- Filtros por status
- Busca por nome/código
- Cards com informações detalhadas
- Estados vazios tratados

### 🛒 Pedidos
- Acompanhamento de pedidos
- Status coloridos
- Filtros múltiplos
- Informações de entrega
- Valores e datas

### 👤 Perfil
- Informações pessoais
- Configurações da conta
- Opções de preferências
- Logout com confirmação

### 🧭 Navegação
- Menu lateral deslizante
- Navegação intuitiva
- Headers customizados
- Ícones consistentes

## 🔧 Scripts Disponíveis

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no Web
npm run web

# Build para produção
npm run build
```

## 📦 Dependências Principais

```json
{
  "@react-navigation/native": "^6.x.x",
  "@react-navigation/stack": "^6.x.x",
  "@reduxjs/toolkit": "^2.x.x",
  "axios": "^1.x.x",
  "expo": "~53.0.0",
  "react": "18.x.x",
  "react-native": "0.79.x",
  "react-redux": "^9.x.x",
  "styled-components": "^6.x.x",
  "typescript": "^5.x.x"
}
```

## 🎯 Próximas Funcionalidades

- [ ] Notificações push
- [ ] Modo escuro
- [ ] Sincronização offline
- [ ] Filtros avançados
- [ ] Relatórios e gráficos
- [ ] Tela de Aprovações
- [ ] Cadastro de Clientes
- [ ] Suporte a múltiplos idiomas


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ por Lucas Pardinho (y)

---

**AllcomApp** - Gerenciamento inteligente de contratos e pedidos 🚀
