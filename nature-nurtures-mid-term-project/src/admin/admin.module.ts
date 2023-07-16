import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity, BlogPost } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './admin.entity';
import { PersonalIdentificationNumberEntity } from '../Admin_NID_Card_Entity/Admin_NID_Card_Entity';
import { ProductImage } from './admin.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'mohammadshafin112233@gmail.com',
          pass: 'xcjodpyptjpesgwy',
        },
      },
    }),
    TypeOrmModule.forFeature([
      AdminEntity,
      ProductEntity,
      PersonalIdentificationNumberEntity,
      ProductImage,
      BlogPost,
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
