import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    productName: "Grilled Tuna Belly",
    description: "Char-grilled tuna belly served with garlic rice and calamansi.",
    price: 320,
    image: require("../../assets/images/products/grilled-tuna-belly.jpg"),
  },
  {
    id: "2",
    productName: "Garlic Butter Shrimp",
    description: "Half kilo of fresh shrimp sautéed in garlic butter sauce.",
    price: 450,
  },
  {
    id: "3",
    productName: "Seafood Kare-Kare",
    description: "Peanut stew with prawns, squid, and mussels, served with bagoong.",
    price: 380,
  },
  {
    id: "4",
    productName: "Kinilaw na Tanigue",
    description: "Fresh Spanish mackerel cured in vinegar, ginger, and chili.",
    price: 280,
  },
  {
    id: "5",
    productName: "Buko Shake",
    description: "Fresh young coconut blended with milk and shaved ice.",
    price: 120,
  },
];