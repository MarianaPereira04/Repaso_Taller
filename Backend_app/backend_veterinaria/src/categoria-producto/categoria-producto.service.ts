import { Injectable } from '@nestjs/common';
import { CreateCategoriaProductoDto } from './dto/create-categoria-producto.dto';
import { UpdateCategoriaProductoDto } from './dto/update-categoria-producto.dto';

@Injectable()
export class CategoriaProductoService {
  create(createCategoriaProductoDto: CreateCategoriaProductoDto) {
    return 'This action adds a new categoriaProducto';
  }

  findAll() {
    return `This action returns all categoriaProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriaProducto`;
  }

  update(id: number, updateCategoriaProductoDto: UpdateCategoriaProductoDto) {
    return `This action updates a #${id} categoriaProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriaProducto`;
  }
}
