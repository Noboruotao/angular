import { Pessoa } from '../Pessoa/pessoa';

export interface Login {
  email: string;
  senha: string;
}

export interface Check {
  success: boolean;
  data: Pessoa;
  roles?: [string];
  permissions?: [string];
  emprestimos_atrasados: Number;
}
