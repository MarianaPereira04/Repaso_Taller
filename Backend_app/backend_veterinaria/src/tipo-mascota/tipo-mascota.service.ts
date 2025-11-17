import { Injectable } from '@nestjs/common';
import { CreateTipoMascotaDto } from './dto/create-tipo-mascota.dto';
import { UpdateTipoMascotaDto } from './dto/update-tipo-mascota.dto';

@Injectable()
export class TipoMascotaService {
  create(createTipoMascotaDto: CreateTipoMascotaDto) {
    return 'This action adds a new tipoMascota';
  }

  findAll() {
    return `This action returns all tipoMascota`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoMascota`;
  }

  update(id: number, updateTipoMascotaDto: UpdateTipoMascotaDto) {
    return `This action updates a #${id} tipoMascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoMascota`;
  }
}
