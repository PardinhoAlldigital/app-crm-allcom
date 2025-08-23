import { ScrollView } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../styles/theme";

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg}px;
`;

export {Content}