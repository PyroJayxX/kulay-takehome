import { Pressable, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

// product comes from props, add action comes from context
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
      <Text className="text-lg font-bold text-gray-900">{product.productName}</Text>
      <Text className="mt-1 text-sm text-gray-500">{product.description}</Text>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-base font-semibold text-orange-600">
          ₱{product.price.toFixed(2)}
        </Text>

        <Pressable
          onPress={() => addToCart(product)}
          className="rounded-full bg-orange-500 px-4 py-2 active:bg-orange-600"
        >
          <Text className="font-semibold text-white">Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}