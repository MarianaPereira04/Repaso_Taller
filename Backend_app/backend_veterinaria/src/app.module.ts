import { Module } from '@nestjs/common';

import { UsuarioModule } from './usuario/usuario.module';
import { TipoMascotaModule } from './tipo-mascota/tipo-mascota.module';
import { MascotaModule } from './mascota/mascota.module';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { ProductoModule } from './producto/producto.module';

import { PrismaModule } from './prisma/prisma.module';  // 👉 IMPORTANTE

@Module({
  imports: [
    PrismaModule,       // 👉 IMPORTANTE
    UsuarioModule,
    TipoMascotaModule,
    MascotaModule,
    CategoriaProductoModule,
    ProductoModule,
  ],
})
export class AppModule {}

