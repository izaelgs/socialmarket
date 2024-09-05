import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async findAllByStoreId(storeId: number) {
    return await this.productsRepository.find({ where: { storeId } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productToUpdate) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = Object.assign(productToUpdate, updateProductDto);
    return await this.productsRepository.save(updatedProduct);
  }

  async remove(id: number) {
    const productToRemove = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productToRemove) {
      throw new Error(`Product with id ${id} not found`);
    }
    return await this.productsRepository.remove(productToRemove);
  }
}
