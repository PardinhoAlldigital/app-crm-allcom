import { Text } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../styles/theme";

const HeaderTitle = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xl}px;
  font-weight: ${theme.fontWeight.bold};
`;

export {HeaderTitle}