import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductoDto) {
    return this.prisma.producto.create({
      data,
    });
  }

  findAll() {
    return this.prisma.producto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { categoria: true },
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    return producto;
  }

  async update(id: string, data: UpdateProductoDto) {
    const exists = await this.prisma.producto.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException('Producto no encontrado');

    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.producto.findUnique({ where: { id } });

    if (!exists) throw new NotFoundException('Producto no encontrado');

    return this.prisma.producto.delete({
      where: { id },
    });
  }
}
