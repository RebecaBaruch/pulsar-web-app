import React from "react";

interface CheckoutCardProps {
  price: number;
  discount?: number;
}

export default function CheckoutCard({ price, discount }: CheckoutCardProps) {
  const subtotal = price;
  const hasDiscount = typeof discount === "number" && discount > 0;
  const total = hasDiscount ? subtotal - discount : subtotal;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium">Resumo do pagamento</h2>
      <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm p-4 w-full max-w-xs">
        <div className="flex justify-between text-gray-dark">
          <span className="text-xs font-medium">Subtotal</span>
          <span className="text-xs">R${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-dark">
          <span className="text-xs font-medium">Desconto</span>
          <span className="text-xs">
            {hasDiscount ? `R$${discount}` : "--"}
          </span>
        </div>
        <hr className="my-2 border-dashed border-gray-300" />
        <div className="flex justify-between font-semibold">
          <span className="text-sm">Total</span>
          <span className="text-sm">R${total}</span>
        </div>
      </div>
    </div>
  );
}
