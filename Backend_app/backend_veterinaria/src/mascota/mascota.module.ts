import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';
import { MascotaController } from './mascota.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MascotaController],
  providers: [MascotaService, PrismaService],
})
export class MascotaModule {}
