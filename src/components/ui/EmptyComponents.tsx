import { Text, View } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styles/theme";

const EmptyState = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl}px;
`;

const EmptyIcon = styled(View)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const EmptyTitle = styled(Text)`
  font-size: ${theme.fontSize.lg}px;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
  text-align: center;
`;

const EmptyDescription = styled(Text)`
  font-size: ${theme.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: 22px;
`;

export {EmptyState, EmptyIcon, EmptyTitle, EmptyDescription}