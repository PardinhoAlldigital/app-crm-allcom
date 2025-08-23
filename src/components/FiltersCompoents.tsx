import { Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../styles/theme";

const FilterButton = styled(TouchableOpacity)<{ active: boolean }>`
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.background};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.full}px;
  margin-right: ${theme.spacing.sm}px;
  ${theme.shadows.sm};
`;

const FilterContainer = styled(View)`
  flex-direction: row;
  margin-bottom: ${theme.spacing.lg}px;
`;

const FilterButtonText = styled(Text)<{ active: boolean }>`
  color: ${props => props.active ? theme.colors.text.white : theme.colors.text.primary};
  font-size: ${theme.fontSize.sm}px;
  font-weight: ${theme.fontWeight.medium};
`;

export {FilterButton, FilterContainer, FilterButtonText} 
