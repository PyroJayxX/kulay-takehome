import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

export default function ProductsScreen() {
  const router = useRouter();
  const { itemCount, total } = useCart();

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: "Kulay Seafood Grill" }} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerClassName="p-4"
      />

      {/* cart bar with live count and total */}
      <Pressable
        onPress={() => router.push("/cart")}
        className="mx-4 mb-2 flex-row items-center justify-between rounded-2xl bg-orange-500 px-5 py-4 active:bg-orange-600"
      >
        <Text className="font-semibold text-white">
          View Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
        </Text>
        <Text className="font-bold text-white">₱{total.toFixed(2)}</Text>
      </Pressable>
    </SafeAreaView>
  );
}