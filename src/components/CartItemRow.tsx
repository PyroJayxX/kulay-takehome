import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";

// item comes from props, selection state is owned by the cart screen
interface CartItemRowProps {
  item: CartItem;
  selectMode: boolean;
  selected: boolean;
  onToggle: () => void;
}

export default function CartItemRow({ item, selectMode, selected, onToggle }: CartItemRowProps) {
  const { addToCart, decreaseQuantity } = useCart();

  return (
    <Pressable
      onPress={onToggle}
      disabled={!selectMode}
      className={`mb-2 flex-row items-center rounded-xl border bg-white p-3 shadow-sm ${
        selected ? "border-orange-500" : "border-transparent"
      }`}
    >
      {selectMode && (
        <View className="mr-3">
          <Ionicons
            name={selected ? "checkbox" : "square-outline"}
            size={24}
            color={selected ? "#f97316" : "#9ca3af"}
          />
        </View>
      )}

      <View className="flex-1">
        <Text numberOfLines={1} className="text-sm font-bold text-gray-900">
          {item.productName}
        </Text>

        <View className="mt-2 flex-row items-center justify-between">
          <View>
            <Text className="text-base font-bold text-orange-600">
              ₱{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Pressable
              onPress={() => decreaseQuantity(item.id)}
              className="h-8 w-8 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300"
            >
              <Text className="text-base font-bold text-gray-800">−</Text>
            </Pressable>

            <Text className="mx-3 text-sm font-semibold text-gray-900">{item.quantity}</Text>

            {/* addToCart already bumps quantity for an existing item */}
            <Pressable
              onPress={() => addToCart(item)}
              className="h-8 w-8 items-center justify-center rounded-full bg-orange-500 active:bg-orange-600"
            >
              <Text className="text-base font-bold text-white">+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}