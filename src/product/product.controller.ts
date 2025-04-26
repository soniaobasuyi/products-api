import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Product | null> {
    return this.productService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatedProduct: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, updatedProduct);
  }
}
