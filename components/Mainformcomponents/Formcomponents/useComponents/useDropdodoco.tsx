import { useDrop } from 'react-dnd';
import { Equip } from '../../../Statuslist/type';

export default function useDropdodoco(g: Number, id: String, type: Equip, accept: Equip[]) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept,
    drop: () => ({ name: type, id, g }), //ここでdrop先の情報を取得
    collect: (monitor) => ({
      isOver: monitor.isOver(), //対象の上に乗っているか
      canDrop: monitor.canDrop(), //ドロップ可能な対象か
    }),
  }));
  const isActive = canDrop && isOver;
  //以下 自由枠(クラス名など)
  let bg = 'opacity-100';
  if (isActive) {
    bg = 'opacity-20';
  } else if (canDrop) {
    bg = 'opacity-60';
  }
  return { canDrop, isOver, drop, bg };
}
