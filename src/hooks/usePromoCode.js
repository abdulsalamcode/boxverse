import { useState } from "react";

const VALID_CODES = {
  BOXVERSE20: { discount: 20, label: "20% off everything" },
  FIRST10:    { discount: 10, label: "10% off your first order" },
  GIFT15:     { discount: 15, label: "15% off gift boxes" },
  CRAFT25:    { discount: 25, label: "25% off artisan items" },
};

export const usePromoCode = () => {
  const [applied,  setApplied]  = useState(false);
  const [discount, setDiscount] = useState(0);
  const [error,    setError]    = useState("");

  const validate = (code) => {
    if (!code) {
      setError("Please enter a promo code.");
      return null;
    }

    const promo = VALID_CODES[code];
    if (!promo) {
      setError("Invalid promo code. Please try again.");
      return null;
    }

    setApplied(true);
    setDiscount(promo.discount);
    setError("");
    return promo;
  };

  const reset = () => {
    setApplied(false);
    setDiscount(0);
    setError("");
  };

  return { validate, applied, discount, error, reset };
};

export default usePromoCode;