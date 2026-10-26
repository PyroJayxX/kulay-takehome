import { useEffect, useMemo, useState } from "react";

// the only valid code and its rate
const VOUCHER_CODE = "discount10";
const DISCOUNT_RATE = 0.1;

export function useVoucher(subtotal: number, itemCount: number) {
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  // drop the voucher when the cart becomes empty
  useEffect(() => {
    if (itemCount === 0) {
      setAppliedCode(null);
      setError("");
    }
  }, [itemCount]);

  // trim and lowercase so "  DISCOUNT10 " still works
  const applyVoucher = (input: string) => {
    if (input.trim().toLowerCase() === VOUCHER_CODE) {
      setAppliedCode(VOUCHER_CODE);
      setError("");
    } else {
      setError("Invalid voucher code");
    }
  };

  // lets the user take the voucher back off
  const removeVoucher = () => {
    setAppliedCode(null);
    setError("");
  };

  const clearError = () => setError("");

  // rounded to 2 decimals to avoid float noise
  const discount = useMemo(
    () => (appliedCode ? Math.round(subtotal * DISCOUNT_RATE * 100) / 100 : 0),
    [appliedCode, subtotal]
  );

  const discountedTotal = useMemo(() => subtotal - discount, [subtotal, discount]);

  return {
    appliedCode,
    error,
    discount,
    discountedTotal,
    applyVoucher,
    removeVoucher,
    clearError,
  };
}