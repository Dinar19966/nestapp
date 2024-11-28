import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
constructor(
  @InjectRepository(Product)
  private readonly productsRepsitory: Repository<Product>,) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = createProductDto.name;
    product.category_id = createProductDto.category_id;

    return this.productsRepsitory.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepsitory.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepsitory.findOneBy({id:id});
  }


  async remove(id: number):Promise<void> {
    await this.productsRepsitory.delete(id);
  }
}
