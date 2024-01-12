import { DocumentBuilder} from '@nestjs/swagger';


export const swaggerOptions = new DocumentBuilder()
    .setTitle('Tourio Api')
    .setDescription('about tourino platform document')
    .setVersion('1.0')
    .addTag('tourino')
    .build();