import { Usuarios } from "@prisma/client";

export class authResponseDto {
  id: string;
  data_admissao: Date;
  email: string;
  funcao: string;
  horas_uteis: number;
  nome: string;
  setor: string;
  status: string;
  tipo_usuario: string;

  constructor(user: Usuarios) {
    this.id = user.id;
    this.data_admissao = user.data_admissao;
    this.email = user.email;
    this.funcao = user.funcao;
    this.horas_uteis = user.horas_uteis;
    this.nome = user.nome;
    this.setor = user.setor;
    this.status = user.status;
    this.tipo_usuario = user.tipo_usuario;
  }
}
