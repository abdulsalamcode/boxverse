import { useState } from "react";

const useBox = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const selectBox = (box) => setSelectedBox(box);

  const clearBox = () => setSelectedBox(null);

  const isFull = (cartLength) =>
    selectedBox ? cartLength >= selectedBox.capacity : false;

  const remainingSlots = (cartLength) =>
    selectedBox ? selectedBox.capacity - cartLength : 0;

  return {
    selectedBox,
    selectBox,
    clearBox,
    isFull,
    remainingSlots,
    capacity: selectedBox?.capacity || 0,
  };
};

export default useBox;