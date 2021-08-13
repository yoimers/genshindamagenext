import { AllFormState, CharArtWepAction, CharArtWepFormState } from '../../Statuslist/type';
import { cloneDeep } from 'lodash';

export default function createchangecharartwepaction(prevState: AllFormState, action: CharArtWepAction): AllFormState {
  let prev = cloneDeep(prevState);
  if (action.action === 'createchangecharartwepaction') {
    if (action.add) {
      const value = prev[action.id.toString()][action.childid.toString()].value;
      const name = prev[action.id.toString()][action.childid.toString()].name;
      prev[action.id.toString()][action.childid.toString()] = { name, value: Number(value) + action.add };
    } else {
      console.log('a');
      const value = action.value ? action.value : prev[action.id.toString()][action.childid.toString()].value;
      const name = action.name ? action.name : prev[action.id.toString()][action.childid.toString()].name;
      if (name === 'name') {
        prev[action.id.toString()][action.childid.toString()] = { name, value: value.toString() };
      } else {
        prev[action.id.toString()][action.childid.toString()] = { name, value: Number(value) };
      }
    }
  } else if (action.action === 'initchangecharartwepaction') {
    const content = { name: action.name, value: action.value };
    const childid = action.childid;
    prev[action.id.toString()] = { ...prev[action.id.toString()], [childid]: content };
  }
  return prev;
}
