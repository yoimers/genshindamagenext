import React from "react";

export default function Inputname() {
  return (
    <div className="m-2 mb-0">
      <label className="inline-block w-20 h-7 text-gray-200 text-center">
        Name
      </label>
      <input
        className="w-16 h-7 rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
      />
    </div>
  );
}
