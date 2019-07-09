import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authorsOptions = new DocumentBuilder()
    .setTitle('Authors API')
    .setDescription('The Authors API description')
    .setVersion('1.0')
    .addTag('authors')
    .setBasePath('api/v1')
    .build();
  const authorDocument = SwaggerModule.createDocument(app, authorsOptions, {
    include: [AuthorsModule],
  });
  SwaggerModule.setup('api/authors', app, authorDocument);

  const booksOptions = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The Books API description')
    .setVersion('1.0')
    .addTag('books')
    .setBasePath('api/v1')
    .build();
  const bookDocument = SwaggerModule.createDocument(app, booksOptions, {
    include: [BooksModule],
  });
  SwaggerModule.setup('api/books', app, bookDocument);

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
