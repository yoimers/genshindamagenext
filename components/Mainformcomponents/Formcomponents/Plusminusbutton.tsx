import React from "react";

interface Button {
  type: "plus" | "minus";
  add: number;
  setValue: any;
}

export default function plusminusbutton({ type, add, setValue }: Button) {
  let c: string;
  if (type === "plus") {
    c = "border-red-600 text-red-700 hover:bg-red-700 focus:ring-red-600";
  } else {
    c = "border-blue-600 text-blue-700 hover:bg-blue-700 focus:ring-blue-600";
  }
  return (
    <button
      onClick={() => setValue((prev) => prev + add)}
      className={`border ${c} h-full w-6 rounded text-center font-black text-lg relative focus:outline-none focus:ring-2 focus:border-transparent hover:text-gray-300 `}
    >
      <p className="block h-full w-full absolute -top-1 left-0">
        {type === "plus" ? "+" : "-"}
      </p>
    </button>
  );
}
