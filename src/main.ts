import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    // ? useGlobalPipes, with the help of this class validator will work through out the code
    // ! whitelist : true will remove the fields which are passed by mistake some extra parameters which are not required
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    const config = new DocumentBuilder()
        .setTitle('Base Nest Mongo')
        .setDescription('Base Nest Mongo API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
    console.log('Server running on port 3000');
}
bootstrap();
