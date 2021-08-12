import React, { Dispatch, ReactElement, SetStateAction } from "react";
import Input from "./Input";
import Plusminusbutton from "./Plusminusbutton";

interface InputForm {
  label: string[];
}

export default function Inputform({ label }: InputForm): ReactElement {
  let select: ReactElement[] | ReactElement;
  if (label.length === 1) {
    select = <label className="block text-gray-200 h-7">{label}</label>;
  } else {
    select = label.map((l, i) => {
      return (
        <option value={l} key={i}>
          {l}
        </option>
      );
    });
  }
  return (
    <span className="inline-block text-center w-30 h-12 p-0 m-0 mb-2">
      {label.length === 1 ? (
        select
      ) : (
        <select className="p-0 h-7 w-full bg-transparent border rounded bg-bgc text-gray-200">
          {select}
        </select>
      )}
      <div className="flex flex-row h-6 w-full">
        <Plusminusbutton type="minus" add={-10} />
        <Plusminusbutton type="minus" add={-1} />
        <Input  />
        <Plusminusbutton type="plus" add={1} />
        <Plusminusbutton type="plus" add={10} />
      </div>
    </span>
  );
}
