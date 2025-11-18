import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateMascotaDto {
  @IsString()
  nombre: string;

  @IsString()
  raza: string;

  @IsInt()
  edad: number;

  @IsString()
  sexo: string;

  @IsString()
  propietario: string;

  @IsString()
  estadoSalud: string;

  @IsUUID()
  tipoMascotaId: string; // RELACIÓN
}
