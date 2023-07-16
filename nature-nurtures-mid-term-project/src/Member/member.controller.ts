import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UsePipes, UseInterceptors, ValidationPipe, Res, Delete, Session, NotFoundException, HttpStatus, ForbiddenException, UseGuards } from "@nestjs/common";
import { MemberService } from "./member.service";
import { EditMemberDTO} from "./member.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { orderDTO } from "./order.dto";
import { PaymentDTO } from "./payment.dto";
import { SessionGuard } from "./session.gaurd";
import { AddToCartDTO} from "src/Seller/product.dto";
import { SellerDTO } from "src/Seller/seller.dto";
import { RatingDTO } from "./rating.dto";
import { ReviewDTO } from "./review.dto";
import { PlantDTO, searchPlantInformationDTO } from "./plant.dto";
import { PlantEntity } from "./plant.entity";
import { BlogDTO, EditBlogDTO } from "./blog.dto";

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    //Show Profile Details
    @Get('/showprofiledetails')
    @UseGuards(SessionGuard)
    showProfileDetails(@Session() session) {
        return this.memberService.showProfileDetails(session.memberID);
    }

    //Show Profile Picture
    @Get('/showprofilepicture')
    @UseGuards(SessionGuard)
    showProfilePicture(@Session() session, @Res() response) {
        const profilePicture = session.profilePicture;
        response.sendFile(profilePicture, { root: './pictures/profile_pictures' });
    }

    //Edit Profile Details
    @Put('/editprofiledetails')
    editProfileDetails(@Session() session, @Query() query:EditMemberDTO) {
        return this.memberService.editProfileDetails(session.memberID, query);
    }

    // Shop
    @Get('/shop')
    @UseGuards(SessionGuard)
    async shop() {
        return await this.memberService.shop();
    }

    // Add to Cart
    @Get('/addtocart')
    @UseGuards(SessionGuard)
    async addToCart(@Session() session, @Query() query:AddToCartDTO, @Body() order: orderDTO) {
        await this.memberService.addToCart(session.memberID, query, order);
        return "Product added to cart";
    }

    // Cart
    @Get('/cart')
    @UseGuards(SessionGuard)
    async cart(@Session() session) {
        return await this.memberService.cart(session.memberID);
    }

    // Search Order
    @Get('/searchorder/:orderID')
    @UseGuards(SessionGuard)
    async searchOrder(@Param('orderID') orderID:string) {
        return await this.memberService.searchOrder(orderID);
    }

    // Delete Order
    @Delete('/cancelorder/:orderID')
    @UseGuards(SessionGuard)
    async cancelOrder(@Param('orderID') orderID:string) {
        return await this.memberService.cancelOrder(orderID);
    }

    // Confirm Order
    @Post('/confirmorder')
    @UseGuards(SessionGuard)
    async confirmOrder(@Query() query: PaymentDTO) {
        return await this.memberService.confirmOrder(query);
    }

    // Rate Product
    @Get('/rateproduct')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    async rateProduct(@Session() session, @Query() query:RatingDTO) {
        const memberID = session.memberID;
        return await this.memberService.rateProduct(memberID, query);
    }

    // Review Product
    @Get('/reviewproduct')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    async reviewProduct(@Session() session, @Query() query:ReviewDTO) {
        const memberID = session.memberID;
        return await this.memberService.reviewProduct(memberID, query);
    }

    // Log Out
    @Get('/logout')
    @UseGuards(SessionGuard)
    async(@Session() session) {
        session.destroy();
    }

    // Add Plant Information To Plant Encyclopedia
    @Post('/addplantinformation')
    async addPlantInformation(@Body() plant: PlantDTO) {
        return await this.memberService.addPlantInformation(plant);
    }
    
    // Notification for water
    @Get('/notificationforwater')
    @UseGuards(SessionGuard)
    async getNotificationForWater() {
        return await this.memberService.getNotificationForWater();
    }

    // Become Seller
    @Post('/becomeseller')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    @UseInterceptors(FileInterceptor('shopPicture',
    { fileFilter(req, file, callback) {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
            callback(null, true);
        } else {
            callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
        }
    },
    limits: { fileSize: 1000000 },
    storage:diskStorage({
        destination: './pictures/shop_pictures',
        filename(req, file, callback) {
            callback(null, Date.now() + file.originalname)
        },
    })
    }))
    async addProduct(@Session() session, @Body() seller: SellerDTO, @UploadedFile() shopPicture: Express.Multer.File) {
        seller.shopPicture = shopPicture.filename;
        console.log(seller.shopPicture);
        await this.memberService.becomeSeller(session.memberID, seller);
        return seller;
    }
    
    // Show Seller Details
    @Get('/showsellerdetails')
    @UseGuards(SessionGuard)
    async showSellerDetails(@Session() session) {
        const memberID = session.memberID;
        return await this.memberService.showSellerDetails(memberID);
    }

    //Edit Seller Details
    @Put('/editsellerdetails')
    async editSellerDetails(@Session() session, @Query() query:EditMemberDTO) {
        return await this.memberService.editSellerDetails(session.memberID, query);
    }

    //Plant Encyclopedia
    @Get('/plantencyclopedia')
    async plantencyclopedia() {
        return await this.memberService.plantencyclopedia();
    }

    //Search Plant
    @Get('/searchplant/:plantName')
    async searchPlant(@Param('plantName') plantName:string):Promise<PlantEntity> {
        return await this.memberService.searchPlant(plantName);
    }

    // Search Plant Information
    @Get('/searchplantinformation')
    async searchPlantInformation(@Query() searchPlant:searchPlantInformationDTO):Promise<PlantEntity>{
        return await this.memberService.searchPlantInformation(searchPlant);
    }

    // Publish Blog
    @Post('/publishblog')
    async publishBlog(@Session() session, @Body() blog:BlogDTO) {
        return await this.memberService.publishBlog(session.memberID, blog);
    }

    // Like Blog
    @Get('/likeblog/:blogid')
    async likeBlog(@Param('blogid') blogID: number) {
        return await this.memberService.likeBlog(blogID);
    }
    // Comment Blog
    @Get('/commentblog')
    async commentBlog(@Session() session, @Query() query: EditBlogDTO) {
        return await this.memberService.commentBlog(session.memberID, query);
    }
    // Read BLogs
    @Get('/readblogs')
    async readBlogs() {
        return await this.memberService.readBlogs();
    }
}