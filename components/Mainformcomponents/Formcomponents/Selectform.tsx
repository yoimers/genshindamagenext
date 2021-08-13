import React, { ReactElement, useContext, useEffect } from 'react';
import { stat } from '../../Statuslist/status';
import { AllFormState, InputForm, Label } from '../../Statuslist/type';
import { AllFormContext } from '../Main';

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
export default function Selectform({ label, id, childid }: InputForm) {
  const { status, statusdispatch } = useContext(AllFormContext);
  const key: Label[] = Object.keys(label) as Array<keyof typeof label>;
  const select = labelorselect(key);

  useEffect(() => {
    const localstatus: AllFormState = JSON.parse(localStorage.getItem('Statuslist'));
    let name: Label = key[0];
    let value: string | number = label[name];
    if (localstatus && localstatus[id] && localstatus[id][childid]) {
      value = localstatus[id][childid].value;
      name = localstatus[id][childid].name;
    }
    statusdispatch({ action: 'initchangecharartwepaction', id, childid, name, value });
    return () => {
      statusdispatch({ action: 'deletecharartwepaction', id });
    };
  }, []);

  const onChange = (e) => {
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, name: e.target.value, value: 0 });
  };
  const value = status[id] ? (status[id][childid] ? status[id][childid].name : 'n') : 'n';
  return (
    <div>
      {key.length === 1 ? (
        select
      ) : (
        <select className="p-0 h-7 w-full bg-transparent border rounded bg-bgc text-gray-200" value={value} onChange={onChange}>
          {select}
        </select>
      )}
    </div>
  );
}
