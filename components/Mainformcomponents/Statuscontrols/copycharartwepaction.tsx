import { AllFormState, CharArtWepAction, CharArtWepFormState, CopyCharArtWepAction } from '../../Statuslist/type';
import { cloneDeep } from 'lodash';

export default function copycharartwepaction(prevState: AllFormState, action: CopyCharArtWepAction): AllFormState {
  let prev = cloneDeep(prevState);
  if (action.toid === 'maxid') {
    const ids = Object.keys(prev);
    const maxid = ids.reduce((max, id) => {
      if (max <= id) {
        return id;
      } else {
        return max;
      }
    });
    prev[maxid] = cloneDeep(prev[action.fromid]);
  } else {
    prev[action.toid] = cloneDeep(prev[action.fromid]);
  }
  return prev;
}
