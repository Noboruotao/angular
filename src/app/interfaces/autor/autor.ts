export interface Autor {
  id: number;
  nome: string;
  nacionalidade_id?: number;
  ano_nascimento?: string;
  ano_falecimento?: string | null;
  nacionalidade?: { id: number; nacionalidade: string; idioma_oficial: number };
}
