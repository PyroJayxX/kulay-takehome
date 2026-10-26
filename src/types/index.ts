import { ImageSourcePropType } from "react-native";

export interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  image?: ImageSourcePropType;
}

export interface CartItem extends Product {
  quantity: number;
}