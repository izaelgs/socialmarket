import { CreateProductDto } from "src/products/dto/create-product.dto";

export const createProductDto: CreateProductDto = {
  name: "Wireless Headphones",
  category: "Electronics",
  price: 1.99,
  quantityAvailable: 50,
  rating: 4.5,
  imgLink: "https://example.com/images/wireless-headphones.jpg",
  storeId: 1,
};
