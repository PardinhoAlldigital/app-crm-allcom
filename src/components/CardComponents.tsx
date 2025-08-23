import { Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../styles/theme";

const CardHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md}px;
`;

const CardTitle = styled(Text)`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: ${theme.spacing.sm}px;
`;

const CardDescription = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
  margin-bottom: ${theme.spacing.md}px;
`;

const CardInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const CardValue = styled(Text)`
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  text-align: right;
`;

const CardFooter = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md}px;
  padding-top: ${theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.border};
`;

const OrderCard = styled(TouchableOpacity)`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.md};
`;

export {CardHeader, CardTitle, CardDescription, CardInfo, CardValue, CardFooter, OrderCard}
