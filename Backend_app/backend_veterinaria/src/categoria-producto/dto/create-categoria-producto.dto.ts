import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  icono: string;
}
