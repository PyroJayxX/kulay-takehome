import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

// everything comes from props, the hook owns the logic
interface VoucherInputProps {
  appliedCode: string | null;
  error: string;
  onApply: (code: string) => void;
  onChangeText: () => void;
}

export default function VoucherInput({
  appliedCode,
  error,
  onApply,
  onChangeText,
}: VoucherInputProps) {
  // text lives here, validation lives in the hook
  const [code, setCode] = useState("");

  const handleChange = (text: string) => {
    setCode(text);
    // typing again clears the old error
    onChangeText();
  };

  return (
    <View className="mx-4 mb-2 rounded-2xl bg-white p-4 shadow-sm">
      <Text className="mb-2 text-sm font-semibold text-gray-700">Voucher code</Text>

      <View className="flex-row items-center">
        <TextInput
          value={code}
          onChangeText={handleChange}
          placeholder="Enter code"
          autoCapitalize="none"
          autoCorrect={false}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900"
        />

        <Pressable
          onPress={() => onApply(code)}
          disabled={code.trim() === ""}
          className={`ml-2 rounded-xl bg-orange-500 px-4 py-3 active:bg-orange-600 ${
            code.trim() === "" ? "opacity-40" : ""
          }`}
        >
          <Text className="font-semibold text-white">Apply</Text>
        </Pressable>
      </View>

      {/* error and success are mutually exclusive */}
      {error !== "" && <Text className="mt-2 text-sm text-red-500">{error}</Text>}
      {appliedCode && !error && (
        <Text className="mt-2 text-sm text-green-600">Voucher applied: 10% off</Text>
      )}
    </View>
  );
}