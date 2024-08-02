import { ICentroDeCusto } from "./ICentroDeCusto";

export interface ICliente {
  id: number,
  nome: string,
  documento: string,
  centro_de_custo: ICentroDeCusto,
  uf: string,
  cidade: string,
  rua: string,
  bairro: string,
  numero: string,
  observacao: string,
  status: string,
  created_at: Date
}