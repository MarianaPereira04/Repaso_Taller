import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TipoMascotaModule } from './tipo-mascota/tipo-mascota.module';
import { MascotaModule } from './mascota/mascota.module';
import { CategoriaProductoModule } from './categoria-producto/categoria-producto.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [UsuarioModule, TipoMascotaModule, MascotaModule, CategoriaProductoModule, ProductoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
