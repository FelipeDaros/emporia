import { HttpStatus } from "@nestjs/common";
import { CreateSquadDto } from "../dto/create-squad.dto";

export interface ICreateSquadResponse {
  message: string;
  body: Omit<CreateSquadDto, 'ids_usuarios'>;
  status: HttpStatus;
}