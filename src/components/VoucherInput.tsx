import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

// everything comes from props, the hook owns the logic
interface VoucherInputProps {
  appliedCode: string | null;
  error: string;
  onApply: (code: string) => void;
  onRemove: () => void;
  onChangeText: () => void;
}

export default function VoucherInput({
  appliedCode,
  error,
  onApply,
  onRemove,
  onChangeText,
}: VoucherInputProps) {
  // typed text and open/closed state are ui only, so they stay here
  const [code, setCode] = useState("");
  const [expanded, setExpanded] = useState(false);

  // collapse and clear the field once a voucher goes through
  useEffect(() => {
    if (appliedCode) {
      setCode("");
      setExpanded(false);
    }
  }, [appliedCode]);

  const handleChange = (text: string) => {
    setCode(text);
    // typing again clears the old error
    onChangeText();
  };

  // applied state: a chip with an x to remove it
  if (appliedCode) {
    return (
      <View className="flex-row">
        <View className="flex-row items-center rounded-full bg-green-100 py-1.5 pl-3 pr-2">
          <Ionicons name="pricetag" size={14} color="#15803d" />
          <Text className="ml-1.5 text-xs font-semibold text-green-700">
            {appliedCode.toUpperCase()} · 10% off
          </Text>
          <Pressable
            onPress={onRemove}
            accessibilityLabel="Remove voucher"
            hitSlop={8}
            className="ml-2"
          >
            <Ionicons name="close-circle" size={16} color="#15803d" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View>
      {/* collapsed row, tap to open the field */}
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-700">Add voucher code</Text>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={18} color="#9ca3af" />
      </Pressable>

      {expanded && (
        <View className="mt-3">
          {/* field and apply button read as one control */}
          <View
            className={`flex-row items-center rounded-xl border bg-gray-50 pl-3 ${
              error ? "border-red-400" : "border-gray-300"
            }`}
          >
            <TextInput
              value={code}
              onChangeText={handleChange}
              placeholder="Enter code"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              className="flex-1 py-2.5 text-sm text-gray-900"
            />

            <Pressable
              onPress={() => onApply(code)}
              disabled={code.trim() === ""}
              className={`px-4 py-2.5 ${code.trim() === "" ? "opacity-40" : ""}`}
            >
              <Text className="text-sm semi-bold text-orange-600">Apply</Text>
            </Pressable>
          </View>

          {error !== "" && <Text className="mt-1.5 text-xs text-red-500">{error}</Text>}
        </View>
      )}
    </View>
  );
}