import React, { Dispatch, SetStateAction } from "react";

interface InputForm {
  value: number;
  setValue: Dispatch<SetStateAction<number>> | undefined;
}

export default function Inputform({ value, setValue }: InputForm) {
  const onChange = (e) => {
    const res = e.target.value.replace(/[^0-9]/g, "");
    setValue(Number(res));
  };
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-12 h-full rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
    />
  
  );
}
