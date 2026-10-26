import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemRow from "../components/CartItemRow";
import VoucherInput from "../components/VoucherInput";
import { useCart } from "../context/CartContext";
import { useVoucher } from "../hooks/useVoucher";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, itemCount, total, removeFromCart } = useCart();
  const {
    appliedCode,
    discountLabel,
    error,
    discount,
    discountedTotal,
    applyVoucher,
    removeVoucher,
    clearError,
  } = useVoucher(total, itemCount);

  // checkbox toggle for item deletion
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectMode = () => {
    setSelectMode((prev) => !prev);
    setSelectedIds([]);
  };

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    selectedIds.forEach(removeFromCart);
    setSelectedIds([]);
    setSelectMode(false);
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: "Your Cart" }} />

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          extraData={{ selectMode, selectedIds }}
          renderItem={({ item }) => (
            <CartItemRow
              item={item}
              selectMode={selectMode}
              selected={selectedIds.includes(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          )}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="p-4"
          ListHeaderComponent={
            <View className="mb-3 flex-row items-center justify-between">
              {/* live count, sums quantities */}
              <Text className="text-base font-semibold text-gray-700">
                {itemCount} {itemCount === 1 ? "item" : "items"} in cart
              </Text>

              {cartItems.length > 0 && (
                <Pressable
                  onPress={toggleSelectMode}
                  accessibilityLabel="Select items to remove"
                  hitSlop={8}
                  className={`rounded-full p-2 ${selectMode ? "bg-gray-200" : ""}`}
                >
                  <Ionicons name="trash-outline" size={22} color="#6b7280" />
                </Pressable>
              )}
            </View>
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

        {cartItems.length > 0 &&
          (selectMode ? (
            // select mode swaps the voucher and totals for cancel and delete
            <View className="mx-4 mb-2 flex-row rounded-2xl bg-white p-3 shadow-sm">
              <Pressable
                onPress={toggleSelectMode}
                className="mr-2 flex-1 items-center rounded-xl bg-gray-200 py-3 active:bg-gray-300"
              >
                <Text className="font-semibold text-gray-800">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={deleteSelected}
                disabled={selectedIds.length === 0}
                className={`flex-1 items-center rounded-xl bg-red-500 py-3 active:bg-red-600 ${
                  selectedIds.length === 0 ? "opacity-40" : ""
                }`}
              >
                <Text className="font-semibold text-white">Delete ({selectedIds.length})</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View className="mx-4 mb-2 rounded-2xl bg-white px-5 py-4 shadow-sm">
                {/* voucher sits at the top of the totals card */}
                <View className="mb-3 border-b border-gray-100 pb-3">
                  <VoucherInput
                    appliedCode={appliedCode}
                    discountLabel={discountLabel}
                    error={error}
                    onApply={applyVoucher}
                    onRemove={removeVoucher}
                    onChangeText={clearError}
                  />
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600">Subtotal</Text>
                  <Text className="text-sm text-gray-900">₱{total.toFixed(2)}</Text>
                </View>

                {/* discount row only shows once a voucher is applied */}
                {appliedCode && (
                  <View className="mt-1 flex-row items-center justify-between">
                    <Text className="text-sm text-green-600">Discount ({discountLabel})</Text>
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

              <Pressable className="mx-4 mb-2 items-center rounded-2xl bg-orange-500 py-4 active:bg-orange-600">
                <Text className="text-base font-bold text-white">Place Order</Text>
              </Pressable>
            </>
          ))}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}