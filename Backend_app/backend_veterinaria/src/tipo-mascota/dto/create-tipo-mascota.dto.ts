import { IsString } from 'class-validator';

export class CreateTipoMascotaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  icono: string;
}

