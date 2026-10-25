import { Stack, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemRow from "../components/CartItemRow";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, itemCount, total } = useCart();

  return (
    // bottom edge only, the stack header handles the top
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-gray-100">
      {/* sets the header title for this screen */}
      <Stack.Screen options={{ title: "Your Cart" }} />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          // live count, sums quantities
          <Text className="mb-3 text-base font-semibold text-gray-700">
            {itemCount} {itemCount === 1 ? "item" : "items"} in cart
          </Text>
        }
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-lg text-gray-500">Your cart is empty</Text>
            <Pressable
              onPress={() => router.back()}
              className="mt-4 rounded-full bg-orange-500 px-5 py-3 active:bg-orange-600"
            >
              <Text className="font-semibold text-white">Browse menu</Text>
            </Pressable>
          </View>
        }
      />

      {/* total stays pinned at the bottom */}
      <View className="mx-4 mb-2 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm">
        <Text className="text-base font-semibold text-gray-700">Total</Text>
        <Text className="text-xl font-bold text-orange-600">₱{total.toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
}