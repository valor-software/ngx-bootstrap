import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

const PORT = process.env.PORT || 3000;

enableProdMode();

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors({
    methods: 'GET',
    maxAge: 3600,
  });
  await app.listen(PORT);
}
bootstrap().catch(err => console.error(err));