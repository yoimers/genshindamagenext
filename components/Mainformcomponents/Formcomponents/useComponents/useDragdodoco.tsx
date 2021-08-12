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
        dispatch({ action: 'createNode', id: dropResult.id, type: type });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return { isDragging, drag };
}
