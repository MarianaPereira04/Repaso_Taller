import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoMascotaDto } from './dto/create-tipo-mascota.dto';
import { UpdateTipoMascotaDto } from './dto/update-tipo-mascota.dto';

@Injectable()
export class TipoMascotaService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTipoMascotaDto) {
    return this.prisma.tipoMascota.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.tipoMascota.findMany();
  }

  async findOne(id: string) {
    const find = await this.prisma.tipoMascota.findUnique({ where: { id } });
    if (!find) throw new NotFoundException('TipoMascota no encontrada');
    return find;
  }

  async update(id: string, dto: UpdateTipoMascotaDto) {
    await this.findOne(id);
    return this.prisma.tipoMascota.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.tipoMascota.delete({ where: { id } });
  }
}
