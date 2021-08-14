import React from 'react';
import { StatButtons, StatusName } from '../../Statuslist/type';

export default function createstatbuttons(
  allcase: StatusName[],
  setButton: React.Dispatch<React.SetStateAction<StatButtons>>
): void {
  const buttons: StatButtons = {};
  allcase.forEach((value, index) => {
    const culcname = value.name.toString();
    buttons[index.toString()] = { culcname, culcresult: false };
  });
  if (Object.keys(buttons).length) {
    buttons['conpare'] = { culcname: 'conpare', culcresult: true };
  }
  setButton(buttons);
}
