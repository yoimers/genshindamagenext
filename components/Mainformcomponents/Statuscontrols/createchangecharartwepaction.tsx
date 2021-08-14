import { AllFormState, CharArtWepAction, CharArtWepFormState } from '../../Statuslist/type';
import { cloneDeep } from 'lodash';

export default function createchangecharartwepaction(prevState: AllFormState, action: CharArtWepAction): AllFormState {
  let prev = cloneDeep(prevState);
  if (action.action === 'createchangecharartwepaction') {
    if (action.add) {
      let value = prev[action.id.toString()][action.childid.toString()].value;
      value = Number(value) + action.add >= 0 ? Number(value) + action.add : 0;
      const name = prev[action.id.toString()][action.childid.toString()].name;
      prev[action.id.toString()][action.childid.toString()] = { name, value };
    } else {
      const name = action.name ? action.name : prev[action.id.toString()][action.childid.toString()].name;
      if (name === 'name') {
        const value = action.value ? hankaku2Zenkaku(action.value.toString()) : '';
        prev[action.id.toString()][action.childid.toString()] = { name, value };
      } else {
        const value = action.value ? Number(action.value) : 0;
        prev[action.id.toString()][action.childid.toString()] = { name, value };
      }
    }
  } else if (action.action === 'initchangecharartwepaction') {
    const content = { name: action.name, value: action.value };
    const childid = action.childid;
    prev[action.id.toString()] = { ...prev[action.id.toString()], [childid]: content };
  }
  return prev;
}

function hankaku2Zenkaku(str: string): string {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}
