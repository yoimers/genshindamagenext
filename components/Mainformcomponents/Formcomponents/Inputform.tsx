import React, { ReactElement, useContext, useState } from 'react';
import { stat } from '../../Statuslist/status';
import { InputForm, Label } from '../../Statuslist/type';
import Input from './Input';
import Plusminusbutton from './Plusminusbutton';

const labelorselect = (label: Label[]) => {
  let select: ReactElement[] | ReactElement;
  if (label.length === 1) {
    select = <label className="block text-gray-200 h-7">{stat[label[0]]}</label>;
  } else {
    select = label.map((l, i) => {
      return (
        <option value={l} key={i}>
          {stat[l]}
        </option>
      );
    });
  }
  return select;
};
export default function Inputform({ label, id }: InputForm): ReactElement {
  const [state, setState] = useState({ name: label[0], value: 0, id: id } as { name: Label; value: number; id: String });
  const onChange = (e) => {
    setState((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  const select = labelorselect(label);
  return (
    <span className="inline-block text-center w-30 h-12 p-0 m-0 mb-2">
      {label.length === 1 ? (
        select
      ) : (
        <select className="p-0 h-7 w-full bg-transparent border rounded bg-bgc text-gray-200" value={state.name} onChange={onChange}>
          {select}
        </select>
      )}
      <div className="flex flex-row h-6 w-full">
        <Plusminusbutton
          type="minus"
          onClick={() =>
            setState((prev) => {
              return { ...prev, value: prev.value - 10 };
            })
          }
        />
        <Plusminusbutton
          type="minus"
          onClick={() =>
            setState((prev) => {
              return { ...prev, value: prev.value - 1 };
            })
          }
        />
        <Input value={state.value} setValue={setState} />
        <Plusminusbutton
          type="plus"
          onClick={() =>
            setState((prev) => {
              return { ...prev, value: prev.value + 1 };
            })
          }
        />
        <Plusminusbutton
          type="plus"
          onClick={() =>
            setState((prev) => {
              return { ...prev, value: prev.value + 10 };
            })
          }
        />
      </div>
    </span>
  );
}
