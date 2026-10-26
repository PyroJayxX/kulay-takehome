import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { FlatList, KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemRow from "../components/CartItemRow";
import VoucherInput from "../components/VoucherInput";
import { useCart } from "../context/CartContext";
import { useVoucher } from "../hooks/useVoucher";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, itemCount, total } = useCart();
  const { appliedCode, error, discount, discountedTotal, applyVoucher, clearError } =
    useVoucher(total, itemCount);

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: "Your Cart" }} />

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItemRow item={item} />}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="p-4"
          ListHeaderComponent={
            // live count, sums quantities
            <Text className="mb-3 text-base font-semibold text-gray-700">
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </Text>
          }
          ListEmptyComponent={
            <View className="items-center py-16">
              <Ionicons name="cart-outline" size={56} color="#9ca3af" />
              <Text className="mt-3 text-lg text-gray-500">Your cart is empty</Text>
              <Pressable
                onPress={() => router.back()}
                className="mt-4 rounded-full bg-orange-500 px-5 py-3 active:bg-orange-600"
              >
                <Text className="font-semibold text-white">Browse menu</Text>
              </Pressable>
            </View>
          }
        />

        {/* voucher and totals only matter when there is something in the cart */}
        {cartItems.length > 0 && (
          <>
            <VoucherInput
              appliedCode={appliedCode}
              error={error}
              onApply={applyVoucher}
              onChangeText={clearError}
            />

            <View className="mx-4 mb-2 rounded-2xl bg-white px-5 py-4 shadow-sm">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">Subtotal</Text>
                <Text className="text-sm text-gray-900">₱{total.toFixed(2)}</Text>
              </View>

              {/* discount row only shows once a voucher is applied */}
              {appliedCode && (
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="text-sm text-green-600">Discount (10%)</Text>
                  <Text className="text-sm text-green-600">-₱{discount.toFixed(2)}</Text>
                </View>
              )}

              <View className="mt-3 flex-row items-center justify-between border-t border-gray-200 pt-3">
                <Text className="text-base font-semibold text-gray-700">Total</Text>
                <Text className="text-xl font-bold text-orange-600">
                  ₱{discountedTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}