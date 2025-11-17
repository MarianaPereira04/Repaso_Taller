import { Module } from '@nestjs/common';
import { TipoMascotaService } from './tipo-mascota.service';
import { TipoMascotaController } from './tipo-mascota.controller';

@Module({
  controllers: [TipoMascotaController],
  providers: [TipoMascotaService],
})
export class TipoMascotaModule {}
