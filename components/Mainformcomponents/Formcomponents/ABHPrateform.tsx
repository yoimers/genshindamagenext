import React, { ReactElement, useContext, useEffect } from 'react';
import { Label, AllFormState } from '../../Statuslist/type';
import { AllFormContext } from '../Main';

type Input = {
  id: string;
  childid: string;
};

export default function ABHPrateform({ id, childid }: Input): ReactElement {
  return (
    <span className="inline-block text-center w-30 h-12 p-0 m-0 mb-2">
      <label className="block text-gray-200 h-7">A-B-HP比率%</label>
      <div className="flex flex-row h-6 w-full">
        <Input initvalue={100} id={id} childid={childid + 'a'} name="ar" />
        <Input initvalue={0} id={id} childid={childid + 'b'} name="br" />
        <Input initvalue={0} id={id} childid={childid + 'hp'} name="hr" />
      </div>
    </span>
  );
}
type Input1 = {
  id: string;
  childid: string;
  initvalue: number;
  name: Label;
};
function Input({ id, childid, initvalue, name }: Input1): ReactElement {
  const { status, statusdispatch } = useContext(AllFormContext);

  useEffect(() => {
    const localstatus: AllFormState = JSON.parse(localStorage.getItem('Statuslist'));
    let value: string | number = initvalue;
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
    const hankaku = hankaku2Zenkaku(e.target.value);
    let res = hankaku.replace(/[^0-9 \.]/g, '');
    if (res[0] === '0' && res[1] !== '.') {
      res = res.slice(1);
    }
    const r = res.match(/\./g) || [];
    const v = r.length > 1 ? '0' : res;
    let value = v;
    const str = v.split('.');
    if (str.length === 2) {
      value = str[0] + '.' + str[1].slice(0, 1) + (str[1].length !== 1 ? str[1].slice(-1) : '');
    }
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, value });
  };

  const hankaku2Zenkaku = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

  const value = status
    ? status[id]
      ? status[id][childid]
        ? status[id][childid].value
        : initvalue
      : initvalue
    : initvalue;

  return (
    <input
      type="text"
      className="w-1/3 h-full rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
      value={value}
      onChange={onChange}
    />
  );
}
