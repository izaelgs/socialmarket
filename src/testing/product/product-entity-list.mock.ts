import { Product } from "../../products/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";

export const ProductList: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1.99,
    quantityAvailable: 50,
    rating: 4.5,
    imgLink: "https://example.com/images/wireless-headphones.jpg",
    storeId: 1,

    createdAt: new Date("2024-02-23T01:21:29.159Z"),
    updatedAt: new Date("2024-02-23T01:21:29.159Z"),
    store: {
      id: 1,
      name: "Loja Exemplo 2",
      displayName: "Loja Exemplo Oficial 2",
      nameLink: "loja-exemplo2",
      description: "Esta é uma loja exemplo para testes.",
      cnpj: "12.345.678/0001-92",
      state: "São Paulo",
      city: "São Paulo",
      category: "Vestuário",
      imgLink: "https://exemplo.com/imagem.jpg",
      createdAt: new Date("2024-02-23T01:21:29.159Z"),
      updatedAt: new Date("2024-02-23T01:21:29.159Z"),
      creatorId: 1,
      creator: {
        id: 1,
        username: "mockuser",
        email: "mockuser@example.com",
      } as UserEntity,
    },
  },
];
