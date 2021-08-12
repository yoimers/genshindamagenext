import React, { ReactElement, useState } from 'react';
import { Action, Label } from '../../Statuslist/type';

type Input = {
  dispatch: React.Dispatch<Action>;
  id: String;
  name: Label;
};
export default function Input({ dispatch, id, name }: Input): ReactElement {
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    const res = e.target.value.replace(/[^0-9]/g, '');
    setValue(res);
    dispatch({ action: 'changeNode_input', id: id, value: res, name: name });
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
