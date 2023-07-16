import { Module } from "@nestjs/common";
import { MemberController } from "./member.controller";
import { MemberService } from "./member.service";
import { MemberEntity } from "./member.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/Seller/product.entity";
import { SellerEntity } from "src/Seller/seller.entity";
import { RatingEntity } from "./rating.entity";
import { ReviewEntity } from "./review.entity";
import { PlantEntity } from "./plant.entity";
import { PaymentEntity } from "./payment.entity";
import { BlogEntity } from "./blog.entity";
@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity, ProductEntity, OrderEntity, SellerEntity, RatingEntity, ReviewEntity, PlantEntity, PaymentEntity, BlogEntity])],
    controllers: [MemberController],
    providers: [MemberService],
})

export class MemberModule {}