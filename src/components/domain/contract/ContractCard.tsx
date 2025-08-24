import { TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../../styles/theme";

const ContractCard = styled(TouchableOpacity)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.md};
`;

export {ContractCard}