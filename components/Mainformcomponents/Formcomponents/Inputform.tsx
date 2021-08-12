import React, { ReactElement, useContext, useState } from 'react';
import { stat } from '../../Statuslist/status';
import { InputForm } from '../../Statuslist/type';
import { StatusContext } from '../Main';
import Input from './Input';
import Plusminusbutton from './Plusminusbutton';

export default function Inputform({ label, id }: InputForm): ReactElement {
  const [name, setName] = useState(label[0]);
  const { types, dispatch } = useContext(StatusContext);
  const onChange = (e) => {
    setName(e.target.value);
  };
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

  return (
    <span className="inline-block text-center w-30 h-12 p-0 m-0 mb-2">
      {label.length === 1 ? (
        select
      ) : (
        <select className="p-0 h-7 w-full bg-transparent border rounded bg-bgc text-gray-200" value={name} onChange={onChange}>
          {select}
        </select>
      )}
      <div className="flex flex-row h-6 w-full">
        <Plusminusbutton type="minus" onClick={() => dispatch({ action: 'changeNode_button', id: id, add: -10, name: name })} />
        <Plusminusbutton type="minus" onClick={() => dispatch({ action: 'changeNode_button', id: id, add: -1, name: name })} />
        <Input dispatch={dispatch} id={id} name={name} />
        <Plusminusbutton type="plus" onClick={() => dispatch({ action: 'changeNode_button', id: id, add: 1, name: name })} />
        <Plusminusbutton type="plus" onClick={() => dispatch({ action: 'changeNode_button', id: id, add: 10, name: name })} />
      </div>
    </span>
  );
}
function DispatchContext(DispatchContext: any) {
  throw new Error('Function not implemented.');
}
