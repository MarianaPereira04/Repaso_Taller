import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoMascotaService } from './tipo-mascota.service';
import { CreateTipoMascotaDto } from './dto/create-tipo-mascota.dto';
import { UpdateTipoMascotaDto } from './dto/update-tipo-mascota.dto';

@Controller('tipo-mascota')
export class TipoMascotaController {
  constructor(private readonly tipoMascotaService: TipoMascotaService) {}

  @Post()
  create(@Body() createTipoMascotaDto: CreateTipoMascotaDto) {
    return this.tipoMascotaService.create(createTipoMascotaDto);
  }

  @Get()
  findAll() {
    return this.tipoMascotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoMascotaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoMascotaDto: UpdateTipoMascotaDto) {
    return this.tipoMascotaService.update(+id, updateTipoMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoMascotaService.remove(+id);
  }
}
