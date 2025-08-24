import { Client } from "./clientTypes";
import { User } from "./userTypes";

export type Contracts = {
  id_contract: number;
  created_at_contract: string;
  vendor_contract: string;
  business_unity: string;
  fk_client: number
  fk_user_created: User
  fk_id_app_crm: number
  cnpj_cpf_contract: string;
  type_contract: string;
  type_cancellation: string;
  status_backoffice_approved: "Aprovado" | "Desativado" | "Recusado" | "Reprovado" | "Pendente";
  date_backoffice_approved: string;
  status_client_approved: "Aprovado" | "Desativado" | "Recusado" | "Reprovado" | "Pendente";
  date_client_approved: string;
  status_contract: "Aprovado" | "Desativado" | "Recusado" | "Reprovado" | "Pendente" | "Ativo";
  operators: string;
  franchiese: string;
  type_coin: string;
  monthly_payment: number;
  activation: string;
  replace: string;
  cancellation: string;
  mb_surplus: string;
  charge: string;
  lending_period_contract: string;
  loyaty_contract: string;
  aproved_allcom_contract: string;
  date_aproved_allcom_contract: string;
  user_aproved_allcom_contract: string;
  aproved_financial_contract: string;
  date_aproved_financial_contract: string;
  user_aproved_financial_contract: string;
  email_sent_contract: string;
  date_sent_contract: string;
  name_aproved_client_contract: string;
  date_aproved_client_contract: string;
  email_aproved_client_contract: string;
  rg_aproved_client_contract: string;
  cpf_aproved_client_contract: string;
  ip_aproved_client_contract: string;
  obs_contract: string;
  email_content_contract: string;
  id_docsales: string;
  status_docsales: string;
  period_by_contract: string;
  pdf_url_original_docsales: string;
  pdf_url_approvals_docsales: string;
  url_to_view_docsales: string;
  url_to_sign: string;
  user_last_update_contract: string;
  last_update_contract: string;
  // item: ItemsOpportunities
  client: Client
  user_created: Pick<User, "name_user">
  fk_id_opportunity: number
  price: number
  brand_name: string
  model_name: string
  recurrence: string
  pre_activation: string
  total_amounth: number
  created_at: string
  price_unity: string
  period: string
  quantity: string;
  quantity_up_link_lora: string
  quantity_down_link_lora: string
  price_sms: string
  only_approved?: string,
  label_approve_contract_rules?: string
  is_copy: string
  lora_excedente: string
  validity_cycle: string
  id_contrato_allmanager: number,
  auto_renew: boolean | number,
  poc: boolean | number,
  promotion: boolean | number,
  expiration_date: string,
  extension_requested: boolean | number,
  original_expiration_date: string,
  extension_status: 'Pendente' | 'Aprovado' | 'Reprovado',
  extension_requested_at: string,
  extension_requested_by: number,
  extension_approved_at: string,
  extension_approved_by: number,
  extension_observations: string,
  needed_apis: string;
  client_goal: string;
  current_connectivity: string;
  future_connectivity: string;
}

export interface ContractsState {
  contracts: Contracts[];
  isLoading: boolean;
  error: string | null;
}