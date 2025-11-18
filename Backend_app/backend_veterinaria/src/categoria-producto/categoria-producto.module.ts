import { Module } from '@nestjs/common';
import { CategoriaProductoService } from './categoria-producto.service';
import { CategoriaProductoController } from './categoria-producto.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CategoriaProductoController],
  providers: [CategoriaProductoService, PrismaService],
})
export class CategoriaProductoModule {}
