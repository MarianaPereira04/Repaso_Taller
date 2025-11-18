import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaProductoDto } from './dto/create-categoria-producto.dto';
import { UpdateCategoriaProductoDto } from './dto/update-categoria-producto.dto';

@Injectable()
export class CategoriaProductoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCategoriaProductoDto) {
    return this.prisma.categoriaProducto.create({ data });
  }

  findAll() {
    return this.prisma.categoriaProducto.findMany({
      include: {
        productos: true, // Mostrar productos de esta categoría
      },
    });
  }

  findOne(id: string) {
    return this.prisma.categoriaProducto.findUnique({
      where: { id },
      include: { productos: true },
    });
  }

  update(id: string, data: UpdateCategoriaProductoDto) {
    return this.prisma.categoriaProducto.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.categoriaProducto.delete({
      where: { id },
    });
  }
}
