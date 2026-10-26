import { Image, Pressable, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

// product comes from props, add action comes from context
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    // no padding on the card, overflow-hidden clips the image to the rounded corners
    <View className="mb-3 h-28 flex-row overflow-hidden rounded-xl bg-white shadow-sm">
      {/* same value as the card height h-28, so the image is always square and flush */}
      {product.image && (
        <Image source={product.image} resizeMode="cover" className="h-28 w-28 bg-gray-100" />
      )}

      {/* padding lives here so text never touches the edges */}
      <View className="flex-1 justify-between p-3">
        <View>
          <Text numberOfLines={1} className="text-base font-bold text-gray-900">
            {product.productName}
          </Text>
          <Text numberOfLines={2} className="mt-0.5 text-xs text-gray-500">
            {product.description}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-orange-600">
            ₱{product.price.toFixed(2)}
          </Text>

          <Pressable
            onPress={() => addToCart(product)}
            className="rounded-full bg-orange-500 px-3 py-1 active:bg-orange-600"
          >
            <Text className="text-sm font-semibold text-white">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}