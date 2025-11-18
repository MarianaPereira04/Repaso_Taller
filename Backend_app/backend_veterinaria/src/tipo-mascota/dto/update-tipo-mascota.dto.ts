import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoMascotaDto } from './create-tipo-mascota.dto';

export class UpdateTipoMascotaDto extends PartialType(CreateTipoMascotaDto) {}

