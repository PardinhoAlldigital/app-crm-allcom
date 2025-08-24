import { Text, View } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../styles/theme";

const InfoItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const InfoIcon = styled(View)`
  margin-right: ${theme.spacing.xs}px;
`;

const InfoText = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

export {InfoItem, InfoIcon, InfoText}
