import { useDrag } from 'react-dnd';
import { Action, CharArtWepAction, Equip } from '../../../Statuslist/type';

export interface BoxProps {
  name: string;
}

interface DropResult {
  id: string;
  name: string;
}
type DragType = Equip | 'culc';
export default function useDragdodoco(type: DragType, id: string, isSide: boolean, dispatch: React.Dispatch<Action>, statusdispatch: React.Dispatch<CharArtWepAction>) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name: type, side: isSide, id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult && type !== 'culc' && isSide) {
        //alert(`You dropped ${item.name} into ${dropResult.name}!`);
        if (item.name === dropResult.name) {
          dispatch({ action: 'siblingNode', id: dropResult.id, type: type });
        } else {
          dispatch({ action: 'createNode', id: dropResult.id, type: type });
        }
      } else if (type === 'char' && item.side) {
        dispatch({ action: 'createNode', id: '0', type: type });
      }
      if (item && dropResult && !isSide && item.name !== 'culc') {
        dispatch({ action: 'createNode', id: dropResult.id, type: item.name });
        statusdispatch({ action: 'copycharartwepaction', toid: 'maxid', fromid: item.id });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return { isDragging, drag };
}
