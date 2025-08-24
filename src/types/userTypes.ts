export type User = {
  id_user: number
  status_user:string
  name_user:string
  email_user:string
  username: string
  image_user: string | null
  mini_image_user: string | null
  created_at: string
  role: string
  fullName: string
  password: string
  avatar?: string | null
  street_user:string
  number_street_user:string
  cep_user:string
  city_user:string
  bi_url_iframe: string
  gestor: {
    id_user: number
    name_user: string
    email_user: string
  }
}