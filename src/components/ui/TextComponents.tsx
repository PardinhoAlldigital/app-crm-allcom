import { Text } from "react-native";
import styled from "styled-components";

import { theme } from "../../styles/theme";

const ClientText = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

const DateText = styled(Text)`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.light};
`;

const ItemsTitle = styled(Text)`
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ItemText = styled(Text)`
  font-size: ${theme.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  line-height: 16px;
`;

export {ClientText, DateText, ItemsTitle, ItemText}
