export interface Anuncio {
  id: number;
  titulo: string;
  categoria: string;
  vendedor: string;
  preco: string;
  avaliacao: number;
  imagem: string;
  descricao: string;
  destaque?: boolean;
  ativo?: boolean;
}

export interface Parceiro {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  beneficio: string;
  avaliacao: number;
  imagem: string;
  whatsapp: string;
}
