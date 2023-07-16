import { Session } from '@nestjs/common/decorators';
import { PersonalIdentificationNumberEntity } from 'src/Admin_NID_Card_Entity/Admin_NID_Card_Entity';
import {
  OneToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('Admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  adminID: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @PrimaryGeneratedColumn()
  personalIdentificationNumberID: number;

  @OneToOne(
    () => PersonalIdentificationNumberEntity,
    (personalIdentificationNumber) => personalIdentificationNumber.admin,
  )
  @JoinColumn()
  personalIdentificationNumber: PersonalIdentificationNumberEntity;

  @OneToMany(() => ProductEntity, (product) => product.admin)
  products: ProductEntity[];
}

@Entity('admin_product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productID: number;
  @Column()
  adminID: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  code: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.products)
  admin: AdminEntity;
}

@Entity('Product Image')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  Product_code: string;
  @Column()
  filename: string;
}

@Entity('Blog')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  post: string;
}
