import { Module } from '@nestjs/common';
import { CategoriaProductoService } from './categoria-producto.service';
import { CategoriaProductoController } from './categoria-producto.controller';

@Module({
  controllers: [CategoriaProductoController],
  providers: [CategoriaProductoService],
})
export class CategoriaProductoModule {}
