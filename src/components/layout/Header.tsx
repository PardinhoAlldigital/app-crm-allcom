import { Text, View } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../styles/theme";

const Header = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: ${theme.borderRadius.xl}px;
  border-bottom-right-radius: ${theme.borderRadius.xl}px;
`;

export {Header}