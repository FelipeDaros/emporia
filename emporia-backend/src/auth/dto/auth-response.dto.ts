import { Usuarios } from "@prisma/client";

export class authResponseDto {
  id: string;
  data_admissao: Date;
  email: string;
  id_funcao: number;
  horas_uteis: number;
  nome: string;
  id_setor: number;
  status: string;
  tipo_usuario: string;

  constructor(user: Usuarios) {
    this.id = user.id;
    this.data_admissao = user.data_admissao;
    this.email = user.email;
    this.id_funcao = user.id_funcao;
    this.horas_uteis = user.horas_uteis;
    this.nome = user.nome;
    this.id_setor = user.id_setor;
    this.status = user.status;
    this.tipo_usuario = user.tipo_usuario;
  }
}
