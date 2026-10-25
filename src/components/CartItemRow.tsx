import { Pressable, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";

// item comes from props, actions come from context
interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-gray-900">{item.productName}</Text>
          <Text className="mt-1 text-sm text-gray-500">₱{item.price.toFixed(2)} each</Text>
        </View>

        {/* deletes the whole row regardless of quantity */}
        <Pressable onPress={() => removeFromCart(item.id)} className="active:opacity-60">
          <Text className="text-sm font-semibold text-red-500">Remove</Text>
        </Pressable>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          {/* disabled at 1, only the remove button can delete the row */}
          <Pressable
            onPress={() => decreaseQuantity(item.id)}
            disabled={item.quantity === 1}
            className={`h-9 w-9 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300 ${
              item.quantity === 1 ? "opacity-40" : ""
            }`}
          >
            <Text className="text-lg font-bold text-gray-800">−</Text>
          </Pressable>

          <Text className="mx-4 text-base font-semibold text-gray-900">{item.quantity}</Text>

          {/* addToCart already bumps quantity for an existing item */}
          <Pressable
            onPress={() => addToCart(item)}
            className="h-9 w-9 items-center justify-center rounded-full bg-orange-500 active:bg-orange-600"
          >
            <Text className="text-lg font-bold text-white">+</Text>
          </Pressable>
        </View>

        {/* line total for this row */}
        <Text className="text-base font-bold text-orange-600">
          ₱{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}