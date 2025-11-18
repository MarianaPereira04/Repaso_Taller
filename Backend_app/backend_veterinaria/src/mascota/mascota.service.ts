import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Injectable()
export class MascotaService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateMascotaDto) {
    return this.prisma.mascota.create({
      data: dto,
      include: { tipoMascota: true },
    });
  }

  findAll() {
    return this.prisma.mascota.findMany({
      include: { tipoMascota: true },
    });
  }

  async findOne(id: string) {
    const mascota = await this.prisma.mascota.findUnique({
      where: { id },
      include: { tipoMascota: true },
    });

    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    return mascota;
  }

  async update(id: string, dto: UpdateMascotaDto) {
    await this.findOne(id);

    return this.prisma.mascota.update({
      where: { id },
      data: dto,
      include: { tipoMascota: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.mascota.delete({
      where: { id },
    });
  }
}
