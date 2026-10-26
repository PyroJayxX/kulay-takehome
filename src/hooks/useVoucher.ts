import { useEffect, useMemo, useState } from "react";
import { vouchers } from "../data/vouchers";
import { Voucher } from "../types";

export function useVoucher(subtotal: number, itemCount: number) {
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [error, setError] = useState("");

  // drop the voucher when the cart becomes empty
  useEffect(() => {
    if (itemCount === 0) {
      setAppliedVoucher(null);
      setError("");
    }
  }, [itemCount]);

  const applyVoucher = (input: string) => {
    const code = input.trim()
    const match = vouchers.find((voucher) => voucher.code === code);

    if (match) {
      setAppliedVoucher(match);
      setError("");
    } else {
      setError("Invalid voucher code");
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setError("");
  };

  const clearError = () => setError("");

  const discount = useMemo(() => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.type === "percent") {
      return Math.round(subtotal * appliedVoucher.value) / 100;
    }
    // fixed discount can never push the total below zero
    return Math.min(appliedVoucher.value, subtotal);
  }, [appliedVoucher, subtotal]);

  const discountedTotal = useMemo(() => subtotal - discount, [subtotal, discount]);

  const discountLabel = useMemo(() => {
    if (!appliedVoucher) return "";
    return appliedVoucher.type === "percent"
      ? `${appliedVoucher.value}% off`
      : `₱${appliedVoucher.value} off`;
  }, [appliedVoucher]);

  return {
    appliedCode: appliedVoucher ? appliedVoucher.code : null,
    discountLabel,
    error,
    discount,
    discountedTotal,
    applyVoucher,
    removeVoucher,
    clearError,
  };
}