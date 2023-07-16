import {
  SignDTO,
  ProductDTO,
  AdminDTO,
  AdminUpdateDTO,
  NID_DTO,
  Admin_login_Dto,
} from './admin.dto';
import { Injectable } from '@nestjs/common';
import { AdminEntity, BlogPost } from './admin.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalIdentificationNumberEntity } from 'src/Admin_NID_Card_Entity/Admin_NID_Card_Entity';
import * as bcrypt from 'bcrypt';
import { ProductImage } from './admin.entity';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(ProductEntity)
    private adminrep: Repository<ProductEntity>,
    @InjectRepository(PersonalIdentificationNumberEntity)
    private repo: Repository<PersonalIdentificationNumberEntity>,
    @InjectRepository(ProductImage)
    private proimg: Repository<ProductImage>,
    @InjectRepository(BlogPost) private blogpost: Repository<BlogPost>,
    private mailerService: MailerService,
  ) {}

  async getadmincrud(): Promise<ProductEntity[]> {
    return this.adminrep.find();
  }

  async getIndex(): Promise<AdminEntity[]> {
    return this.adminRepo.find();
  }

  async getAdminbyID(id): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ adminID: id });
  }

  async addadmin(data: AdminDTO): Promise<AdminEntity> {
    return this.adminRepo.save(data);
  }

  //product add
  async admincrud(data: ProductDTO, adminemail): Promise<ProductEntity> {
    const admin = await this.adminRepo.findOneBy({ email: adminemail });
    data.adminID = admin.adminID;
    data.AdminEmail = adminemail;
    return this.adminrep.save(data);
  }

  async NID_add(data: NID_DTO): Promise<PersonalIdentificationNumberEntity> {
    return this.repo.save(data);
  }

  async admincrudSearch(id, name, code): Promise<ProductEntity> {
    return this.adminrep.findOneBy({ productID: id, name: name, code: code });
  }
  //nid search
  nid_search(id): any {
    console.log(id);
    //return this.repo.findOneBy({ id: id });
  }

  async updateAdmin(query) {
    const id = query.id;
    const name = query.name;
    const admin = await this.adminRepo.findOneBy({ adminID: id });
    admin.name = name;

    return this.adminRepo.save(admin);
  }

  async updateCrud(qury) {
    const id = qury.id;
    const name = qury.name;
    const password = qury.password;
    const admincrud = await this.adminrep.findOneBy({ productID: id });

    admincrud.name = name;
    admincrud.code = password;

    return this.adminrep.save(admincrud);
  }
  //admin delte
  async adminDelete(id: number): Promise<void> {
    await this.adminRepo.delete(id);
    console.log('Sucess');
  }

  async productdelete(id: number): Promise<void> {
    await this.adminrep.delete(id);
    console.log('sucess');
  }

  async Blogpost(data: any): Promise<BlogPost> {
    return this.blogpost.save(data);
  }

  async signup(data: SignDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.adminRepo.save(data);
  }

  async product_image(mydata: ProductImage): Promise<ProductImage> {
    console.log(mydata);
    return this.proimg.save(mydata);
  }

  async adminlogin(data: Admin_login_Dto): Promise<boolean> {
    const admindata: AdminDTO = await this.adminRepo.findOneBy({
      email: data.email,
    });
    const match: boolean = await bcrypt.compare(
      data.password,
      admindata.password,
    );
    return match;
  }

  async sendEmail(mydata) {
    await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }

  updateID(id: number, data: AdminDTO): object {
    console.log(id);
    console.log(data);
    return data;
  }
}
