import React, { ReactElement } from 'react';
import { InputForm } from '../../Statuslist/type';
import Input from './Input';
import Plusminusbutton from './Plusminusbutton';
import Selectform from './Selectform';

export default function Inputform({ label, id, childid }: InputForm): ReactElement {
  return (
    <span className="inline-block text-center w-30 h-12 p-0 m-0 mb-2">
      <Selectform id={id} childid={childid} label={label} />
      <div className="flex flex-row h-6 w-full">
        <Plusminusbutton type="minus" id={id} childid={childid} add={-10} />
        <Plusminusbutton type="minus" id={id} childid={childid} add={-1} />
        <Input id={id} childid={childid} />
        <Plusminusbutton type="plus" id={id} childid={childid} add={1} />
        <Plusminusbutton type="plus" id={id} childid={childid} add={10} />
      </div>
    </span>
  );
}
