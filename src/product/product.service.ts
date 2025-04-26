import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`item with the id ${id} not found`);
    }
    return product;
  }

  async delete(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    await this.productRepository.delete(id);
    return product;
  }

  async update(id: number, updatedProduct: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Item with the id ${id} not found`);
    }
    Object.assign(product, updatedProduct);
    return this.productRepository.save(product);
  }
}
