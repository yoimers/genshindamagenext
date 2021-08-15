import React from 'react';
import { CulcResults, StatButtons, Status, StatusName } from '../../Statuslist/type';
import optimizeculc from '../Chartcomponents/optimizeculc';

export default function createstatbuttons(
  allcase: Status[],
  setButton: React.Dispatch<React.SetStateAction<StatButtons>>
): void {
  const buttons: StatButtons = {};
  allcase.forEach((value, index) => {
    const culcname = value.name.toString();
    buttons[index.toString()] = { culcname, culcresult: false, culctype: 'opt' };
  });
  buttons['expected_compare'] = {
    culcname: '期待値比較',
    culcresult: false,
    culctype: 'compare',
  };
  buttons['max_compare'] = {
    culcname: '最大ダメ比較',
    culcresult: false,
    culctype: 'compare',
  };
  buttons['expected_max_compare'] = {
    culcname: '期待-最大比較',
    culcresult: false,
    culctype: 'compare',
  };
  setButton(buttons);
  alloptimizetion(buttons, allcase, setButton); //全て最適化 比較に追加
}

function alloptimizetion(
  buttons: StatButtons,
  allcase: Status[],
  setButton: React.Dispatch<React.SetStateAction<StatButtons>>
): void {
  Object.entries(buttons).forEach(([id, button]) => {
    if (button.culctype === 'opt') {
      const results: CulcResults = optimizeculc(id, allcase);
      setButton((prev) => {
        //
        const expected = results.map((result, index) => {
          return {
            ...prev['expected_compare'].culcresult[index],
            t: result.t,
            [id]: result.expecteddamage,
          };
        });
        const max = results.map((result, index) => {
          return {
            ...prev['max_compare'].culcresult[index],
            t: result.t,
            [id]: result.maxdamage,
          };
        });
        const expected_max = results.map((result, index) => {
          return {
            ...prev['expected_max_compare'].culcresult[index],
            t: result.t,
            [id]: result.expected_max_damage,
          };
        });
        //

        return {
          ...prev,
          [id]: {
            culcname: allcase[id].name,
            culcresult: results,
            culctype: 'opt',
          },
          expected_compare: {
            culcname: '期待値比較',
            culcresult: expected,
            culctype: 'compare',
          },
          max_compare: {
            culcname: '最大ダメ比較',
            culcresult: max,
            culctype: 'compare',
          },
          expected_max_compare: {
            culcname: '期待-最大比較',
            culcresult: expected_max,
            culctype: 'compare',
          },
        };
      });
    }
  });
}
