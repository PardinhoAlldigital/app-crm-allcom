import { View } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../styles/theme";

const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.backgroundSecondary};
`;

const ItemsContainer = styled(View)`
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

export {Container, ItemsContainer}