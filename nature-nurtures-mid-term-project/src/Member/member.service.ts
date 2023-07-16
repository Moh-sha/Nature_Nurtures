import { HttpStatus, Injectable, NotFoundException, Session, UnauthorizedException } from "@nestjs/common";
import { EditMemberDTO} from "./member.dto";
import { orderDTO } from "./order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberEntity } from "./member.entity";
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";
import { PaymentDTO } from "./payment.dto";
import { ProductEntity } from "src/Seller/product.entity";
import { AddToCartDTO } from "src/Seller/product.dto";
import { SellerEntity } from "src/Seller/seller.entity";
import { SellerDTO } from "src/Seller/seller.dto";
import { RatingEntity } from "./rating.entity";
import { RatingDTO } from "./rating.dto";
import { ReviewEntity } from "./review.entity";
import { ReviewDTO } from "./review.dto";
import { PlantDTO, searchPlantInformationDTO } from "./plant.dto";
import { PlantEntity } from "./plant.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";
import { PaymentEntity } from "./payment.entity";
import { format, parse } from "date-fns";
import { BlogEntity } from "./blog.entity";

@Injectable()
export class MemberService{
    constructor(
        @InjectRepository(MemberEntity)
        private memberRepository: Repository<MemberEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(SellerEntity)
        private sellerRepository: Repository<SellerEntity>,
        @InjectRepository(RatingEntity)
        private ratingRepository: Repository<RatingEntity>,
        @InjectRepository(ReviewEntity)
        private reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(PlantEntity)
        private plantRepository: Repository<PlantEntity>,
        @InjectRepository(PaymentEntity)
        private paymentRepository: Repository<PaymentEntity>,
        @InjectRepository(BlogEntity)
        private blogRepository: Repository<BlogEntity>,
        private mailerService: MailerService
    ) {}

    // Show Profile Details
    async showProfileDetails(memberID) {
        console.log(memberID);
        return await this.memberRepository.findOneBy({ memberID : memberID });
    }

    // Edit Profile Details
    async editProfileDetails(memberID, query: EditMemberDTO)
    {
        const profileDetails = await this.memberRepository.findOneBy({ memberID : memberID });
        const editKey = query.editKey;
        const editValue = query.editValue;
        let validKey = false;
        for (let key in profileDetails) {
            if (key == editKey) {
                validKey = true;
            }
        }
        if (!validKey) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Property not found"
            })
        }
        profileDetails[editKey] = editValue;
        
        await this.memberRepository.save(profileDetails);
        return ("Update Successful");
    }

    // Shop
    async shop() {
        return await this.productRepository.find();
    }

    async addToCart(memberID, query: AddToCartDTO, order: orderDTO) {
        const productIDs = query.productID;
        const stringProducts: string[] = productIDs.split(',');
        const numberProducts: number[] = stringProducts.map(str => parseInt(str));
        order.totalAmount = 0;
        for (let productID of numberProducts) {
            const product = await this.productRepository.findOneBy({ productID: productID });
            order.products = [];
            order.products.push(product.productName);
            order.totalAmount += product.price;
        }
        const member = await this.memberRepository.findOneBy(memberID);
        order.memberID = memberID;
        order.orderDate = new Date();
        order.orderStatus = "Pending";
        order.shippingAddress = member.address;
        return this.orderRepository.save(order);
    }

    async cart(memberID) {
        const orders = await this.orderRepository.findBy( { memberID: memberID} );
        return orders;
    }

    async searchOrder(orderID) {
        const order = await this.orderRepository.findOneBy( { orderID: orderID } );
        if (order !== null) {
            return order;
        } else {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Order not found"
            })
        }
    }

    async cancelOrder(orderID) {
        const order = await this.orderRepository.findOneBy( { orderID: orderID } );
        if (order !== null) {
            await this.orderRepository.delete( { orderID: orderID } );
            return "Delete Successful";
        } else {
            throw new UnauthorizedException({
                status: HttpStatus.NOT_FOUND,
                message: "Order not found"
            })
        }
    }

    async confirmOrder(query: PaymentDTO) {
        const orderID = query.orderID;
        const order = await this.orderRepository.findOneBy( { orderID: orderID } );
        if (order == null) {
            throw new UnauthorizedException({
                status: HttpStatus.NOT_FOUND,
                message: "Order not found"
            })
        }
        order.orderStatus = "Shipped";
        await this.orderRepository.save(order);
        await this.orderRepository.save(order);
        query.amount = order.totalAmount;
        query.paymentDate = new Date();
        return this.paymentRepository.save(query);
    }

    async rateProduct(memberID, query:RatingDTO) {
        query.memberID = memberID;
        await this.ratingRepository.save(query);
        const productID = query.productID;
        const product = await this.productRepository.findOneBy({ productID: productID });
        const rating = await this.ratingRepository.createQueryBuilder().select('avg(rating)').getRawOne();
        product.ratings = rating.avg;
        return await this.productRepository.save(product);
    }

    // Review Product
    async reviewProduct(memberID, query:ReviewDTO) {
        query.memberID = memberID;
        await this.reviewRepository.save(query);
        const productID = query.productID;
        const product = await this.productRepository.findOneBy({ productID: productID });
        const productReviews = await this.reviewRepository.findBy({ productID: productID });
        product.reviews = {};
        for (let review in productReviews) {
            const member = await this.memberRepository.findOneBy({ memberID: productReviews[review].memberID });
            product.reviews[member.firstName] = productReviews[review].review;
        }
        return await this.productRepository.save(product);
    }

    async addPlantInformation(plant: PlantDTO) {
        return await this.plantRepository.save(plant);
    }

    // Notification for Water
    async getNotificationForWater() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        if (hour == 9) {
            await this.mailerService.sendMail({to: 'likhonsiddique01@gmail.com',
            subject: 'Notification for Water',
            text: (`
            -------------------
            🌄 GOOD MORNING 🌄
            -------------------
            Time: ${hour}:${minute}:${second}
            -------------------
            🌱 It's time to 
            water your plants 🌱
            -------------------
            `),
            });
        } else if (hour >= 12 && hour < 18) {
            await this.mailerService.sendMail({to: 'likhonsiddique01@gmail.com',
            subject: 'Notification for Water',
            text: (`
            --------------------
            ☀️ GOOD AFTERNOON ☀️
            -------------------
            Time: ${hour}:${minute}:${second}
            --------------------
            😇 Don't forget to
            drink water 😇
            --------------------
            `),
            });
        } else {
            await this.mailerService.sendMail({to: 'likhonsiddique01@gmail.com',
            subject: 'Notification for Water',
            text: (`
            -----------------
            🌙 GOOD NIGHT 🌙
            -------------------
            Time: ${hour}:${minute}:${second}
            -----------------
            😇 Early to bed,
            Early to rise 😇
            -----------------
            `),
            });
        }
    }

    // Become Seller
    async becomeSeller(memberID, seller: SellerDTO) {
        seller.memberID = memberID;
        return await this.sellerRepository.save(seller);
    }

    // Show Seller Details
    async showSellerDetails(memberID) {
        return await this.sellerRepository.findOneBy({ memberID: memberID });
    }

    // Edit Profile Details
    async editSellerDetails(memberID, query: EditMemberDTO)
    {
        const sellerDetails = await this.sellerRepository.findOneBy({ memberID : memberID });
        const editKey = query.editKey;
        const editValue = query.editValue;
        let validKey = false;
        for (let key in sellerDetails) {
            if (key == editKey) {
                validKey = true;
            }
        }
        if (!validKey) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Property not found"
            })
        }
        sellerDetails[editKey] = editValue;
        
        return await this.sellerRepository.save(sellerDetails);
    }

    // Plant Encyclopedia
    async plantencyclopedia() {
        return await this.plantRepository.find();
    }

    // Search Plant
    async searchPlant(plantName):Promise<PlantEntity> {
        const plant = await this.plantRepository.findOneBy({ name: plantName });
        if (plant == null) {
            throw new NotFoundException({
                status: HttpStatus.NOT_FOUND,
                message: "Property not found"
            })
        } else {
            return plant;
        }
    }

    // Search Plant Information
    async searchPlantInformation(searchPlant:searchPlantInformationDTO){
        const plant = await this.plantRepository.findOneBy({ name: searchPlant.name});
        for (let property in plant) {
            if (property == searchPlant.property) {
                return plant[property];
            }
        }
    }

    async publishBlog(memberID, blog) {
        blog.memberID = memberID;
        const member = await this.memberRepository.findOneBy({ memberID: memberID})
        blog.author = member.firstName + " " + member.lastName;
        blog.date = new Date();
        blog.likes = 0;
        return await this.blogRepository.save(blog);
    }

    async likeBlog(blogID) {
        const blog = await this.blogRepository.findOneBy({ blogID: blogID})
        blog.likes += 1;
        return await this.blogRepository.save(blog);
    }

    async commentBlog(memberID, query) {
        const blog = await this.blogRepository.findOneBy({ blogID: query.blogID});
        const member = await this.memberRepository.findOneBy({ memberID: memberID });
        const temporaryString = blog.comments;
        blog.comments = temporaryString + ", " + member.firstName + ": " + query.comment;
        return await this.blogRepository.save(blog);
    }

    async readBlogs() {
        return await this.blogRepository.find();
    }

}