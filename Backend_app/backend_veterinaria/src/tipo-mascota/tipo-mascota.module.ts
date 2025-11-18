import { Module } from '@nestjs/common';
import { TipoMascotaService } from './tipo-mascota.service';
import { TipoMascotaController } from './tipo-mascota.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TipoMascotaController],
  providers: [TipoMascotaService, PrismaService],
})
export class TipoMascotaModule {}
