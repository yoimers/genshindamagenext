import { AllFormState, CharArtWepAction, CharArtWepFormState } from '../../Statuslist/type';
import { cloneDeep } from 'lodash';

export default function deletechangecharartwepaction(prevState: AllFormState, action: CharArtWepAction): AllFormState {
  let prev = cloneDeep(prevState);
  if (action.action === 'deletecharartwepaction') {
    delete prev[action.id];
  }
  console.log('deletedelete');
  return prev;
}
