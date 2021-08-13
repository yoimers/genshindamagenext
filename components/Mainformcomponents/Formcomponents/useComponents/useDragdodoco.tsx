import { useDrag } from 'react-dnd';
import { Action, Equip } from '../../../Statuslist/type';

export interface BoxProps {
  name: string;
}

interface DropResult {
  id: String;
  name: string;
}
export default function useDragdodoco(type: Equip | 'culc', dispatch: React.Dispatch<Action>) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name: type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult && type !== 'culc') {
        //alert(`You dropped ${item.name} into ${dropResult.name}!`);
        if (item.name === dropResult.name) {
          dispatch({ action: 'siblingNode', id: dropResult.id, type: type });
        } else {
          dispatch({ action: 'createNode', id: dropResult.id, type: type });
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return { isDragging, drag };
}
