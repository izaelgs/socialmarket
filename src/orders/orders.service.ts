import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    orderData: Partial<CreateOrderDto>,
    productIds: number[],
    userId: number,
  ): Promise<Order> {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Find the products
    const products = await this.productRepository.findByIds(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundException("Some products were not found");
    }

    // Calculate total amount
    const totalAmount = products.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    // Create the order
    const order = this.orderRepository.create({
      ...orderData,
      totalAmount,
      user,
      products,
      status: "pending", // Set initial status
    });

    // Save the order
    const savedOrder = await this.orderRepository.save(order);

    // Return the order with relations
    return this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ["user", "products"],
    });
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ["user", "products"],
    });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ["user", "products"],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orderToUpdate = await this.orderRepository.findOne({
      where: { id },
      relations: ["products"],
    });
    if (!orderToUpdate) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // If productIds are provided in the updateOrderDto, update the products
    if (updateOrderDto.productIds) {
      const products = await this.productRepository.findByIds(
        updateOrderDto.productIds,
      );
      if (products.length !== updateOrderDto.productIds.length) {
        throw new NotFoundException("Some products were not found");
      }
      orderToUpdate.products = products;

      // Recalculate total amount
      orderToUpdate.totalAmount = products.reduce(
        (sum, product) => sum + product.price,
        0,
      );
    }

    // Update other fields
    Object.assign(orderToUpdate, updateOrderDto);

    return await this.orderRepository.save(orderToUpdate);
  }

  async remove(id: number) {
    const orderToRemove = await this.orderRepository.findOne({
      where: { id },
    });
    if (!orderToRemove) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return await this.orderRepository.remove(orderToRemove);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const updatedOrder = await this.orderRepository.findOne({
      where: { id: parseInt(orderId) },
    });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    updatedOrder.status = status;
    return await this.orderRepository.save(updatedOrder);
  }
}
