import { Text, View } from "react-native";
import styled from "styled-components/native";
import { theme } from "../styles/theme";

const StatusBadge = styled(View)<{ status: string }>`
  background-color: ${
    props => {
      switch (props.status) {
        case 'Aprovado': return theme.colors.success;
        case 'Pendente': return theme.colors.warning;
        case 'Concluído': return theme.colors.primary;
        case 'Cancelado': return theme.colors.error;
        case 'Desativado': return theme.colors.secondary;
        default: return theme.colors.text.secondary;
      }
    }
  };
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
`;

const StatusOrderBadge = styled(View)<{ status: string }>`
  background-color: ${
    props => {
      switch (props.status) {
        case 'delivered': return theme.colors.success;
        case 'shipped': return theme.colors.primary;
        case 'processing': return theme.colors.warning;
        case 'pending': return theme.colors.secondary;
        case 'cancelled': return theme.colors.error;
        default: return theme.colors.text.secondary;
      }
    }
  };
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.full}px;
`;

const StatusText = styled(Text)`
  color: ${theme.colors.text.white};
  font-size: ${theme.fontSize.xs}px;
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
`;

export {StatusBadge, StatusText, StatusOrderBadge}