import { Injectable, OnModuleInit, INestApplication, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Opcional: permite usar Prisma con shutdown hooks
  async enableShutdownHooks(app: INestApplication) {
    // PrismaClient.$on types can be incompatible in some @prisma/client versions; use a type assertion.
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
