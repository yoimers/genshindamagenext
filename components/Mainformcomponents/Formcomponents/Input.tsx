import React, { ReactElement, useState } from 'react';
import { Action, Label } from '../../Statuslist/type';

type Input = {
  value: number;
  setValue: React.Dispatch<
    React.SetStateAction<{
      name: Label;
      value: number;
      id: String;
    }>
  >;
};
export default function Input({ value, setValue }: Input): ReactElement {
  const onChange = (e) => {
    const res = e.target.value.replace(/[^0-9]/g, '');
    setValue((prev) => {
      return { ...prev, value: res };
    });
  };
  return (
    <input
      type="text"
      className="w-12 h-full rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
      value={value}
      onChange={onChange}
    />
  );
}
