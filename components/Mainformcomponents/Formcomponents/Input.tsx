import React, { Dispatch, SetStateAction } from "react";



export default function Inputform() {
  const onChange = (e) => {
    const res = e.target.value.replace(/[^0-9]/g, "");
    //setValue(Number(res));
  };
  return (
    <input
      type="text"
      className="w-12 h-full rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
    />
  
  );
}
