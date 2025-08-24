import { TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { theme } from "../../styles/theme";

const AddButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
`;

export {AddButton}